from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="雨姐声援 API")

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据库路径
DB_PATH = os.path.join(os.path.dirname(__file__), "supporters.db")


def init_db():
    """初始化数据库"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS supporters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


def get_db_connection():
    """获取数据库连接"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# 初始化数据库
init_db()


class Supporter(BaseModel):
    name: str


@app.get("/api/supporters", response_model=List[dict])
def get_supporters(limit: int = 100):
    """获取最新的声援者列表（去重，取最新100条）"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT name, created_at FROM supporters
        GROUP BY name
        ORDER BY MAX(created_at) DESC
        LIMIT ?
    """, (limit,))
    rows = cursor.fetchall()
    conn.close()

    return [{"name": row["name"], "created_at": row["created_at"]} for row in rows]


@app.post("/api/supporters", response_model=dict)
def add_supporter(supporter: Supporter):
    """添加声援者"""
    name = supporter.name.strip()

    if not name:
        raise HTTPException(status_code=400, detail="姓名不能为空")

    if len(name) > 50:
        raise HTTPException(status_code=400, detail="姓名不能超过50个字符")

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO supporters (name) VALUES (?)", (name,))
        conn.commit()
        success = True
    except sqlite3.IntegrityError:
        # 姓名已存在，更新时间为当前时间
        cursor.execute("UPDATE supporters SET created_at = CURRENT_TIMESTAMP WHERE name = ?", (name,))
        conn.commit()
        success = True
    finally:
        conn.close()

    return {"success": True, "name": name, "message": "声援成功！"}


@app.get("/api/health")
def health_check():
    """健康检查"""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

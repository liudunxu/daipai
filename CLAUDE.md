# 项目规范

## 项目概述

这是一个 React + Tailwind CSS + FastAPI 开发的单页面营销推广页面，主要内容为足部护理产品/知识分享，风格采用东北雨姐（网红）的口吻和元素。支持用户输入姓名声援雨姐。

## 技术栈

- **前端**: React 18 + Vite + Tailwind CSS 3.4
- **后端**: Python + FastAPI + SQLite
- **端口**: 前端 3000，后端 8000

## 快速开始

```bash
# 安装前端依赖
npm install

# 安装后端依赖
pip install -r requirements.txt

# 启动后端服务（单独）
python server/main.py

# 启动前端服务
npm run dev

# 一键启动前后端
./start.sh

# 构建生产版本
npm run build
```

## 文件结构

```
claude-code/
├── index.html              # 入口 HTML
├── package.json             # 前端项目配置
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
├── postcss.config.js        # PostCSS 配置
├── requirements.txt         # 后端依赖
├── start.sh                # 一键启动脚本
├── server/
│   ├── main.py             # FastAPI 后端入口
│   └── supporters.db       # SQLite 数据库
├── src/
│   ├── main.jsx            # React 入口
│   ├── App.jsx             # 主组件
│   ├── index.css           # 全局样式
│   └── components/         # 组件目录
│       ├── Header.jsx      # 头部组件
│       ├── Symptoms.jsx   # 症状组件
│       ├── Solutions.jsx  # 解决方案组件
│       ├── Tips.jsx       # 提示组件
│       ├── Supporters.jsx # 声援表单组件
│       ├── Cta.jsx        # 行动召唤组件
│       └── Footer.jsx     # 页脚组件
├── docs/                   # 文档目录
└── images/                 # 图片资源
```

## API 规范

### 声援者接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/supporters | 获取声援者列表（最新100条，去重） |
| POST | /api/supporters | 添加声援者 |
| GET | /api/health | 健康检查 |

### 容错处理
- 前端调用 API 时必须使用 try-catch 包裹
- API 不可用时显示友好提示，不阻止页面交互
- 使用 `setTimeout` 或 `interval` 定期重试

## 开发规范

### 组件规范
- 组件文件使用 PascalCase 命名（如 `Header.jsx`）
- 组件放在 `src/components/` 目录
- 每个组件功能单一，代码简洁

### Tailwind CSS 规范
- 使用 Tailwind 工具类进行样式开发
- 自定义颜色在 `tailwind.config.js` 的 `theme.extend.colors` 中配置
- 动画在 `theme.extend.animation` 中配置

### 内容风格（重要）
- **必须使用东北雨姐的口气风格**
- 使用东北方言词汇：整、嘎嘎、贼、老铁、那玩意儿、整一下子等
- 语气亲切、豪爽、带点搞笑
- 示例：
  - "整干净" 而非 "保持清洁"
  - "嘎嘎好使" 而非 "非常好用"
  - "脚出汗贼多" 而非 "脚部出汗多"
  - "干就完了" 而非 "坚持就是胜利"

## Git 提交规范

### 自动提交
**每次修改完代码后，必须自动提交 git 记录**

- 使用 `git add` 暂存修改的文件
- 使用 `git commit` 提交，格式：`feat: xxx` 或 `fix: xxx`
- 提交信息需要简洁描述本次改动

### 提交信息格式
```
feat: 添加xxx功能
fix: 修复xxx问题
style: 优化xxx样式
refactor: 重构xxx代码
docs: 更新xxx文档
```

## 注意事项

1. 外部图片链接可能不稳定，建议使用本地图片或 base64
2. 如需添加图片，先确认用户提供的图片路径/URL
3. 开发完成后运行 `npm run build` 构建生产版本

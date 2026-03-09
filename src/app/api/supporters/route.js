import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'supporters.json')

// 确保数据目录存在
function ensureDbExists() {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]))
  }
}

// 读取数据
function getSupporters() {
  ensureDbExists()
  const data = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

// 写入数据
function saveSupporters(supporters) {
  fs.writeFileSync(DB_PATH, JSON.stringify(supporters, null, 2))
}

// GET 获取声援者列表
export async function GET() {
  try {
    const supporters = getSupporters()
    // 按姓名去重，取最新100条
    const uniqueMap = new Map()
    supporters.forEach(s => uniqueMap.set(s.name, s))
    const unique = Array.from(uniqueMap.values())
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 100)

    return NextResponse.json(unique)
  } catch (error) {
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}

// POST 添加声援者
export async function POST(request) {
  try {
    const { name } = await request.json()

    if (!name || !name.trim()) {
      return NextResponse.json({ error: '姓名不能为空' }, { status: 400 })
    }

    const trimmedName = name.trim().slice(0, 50)

    const supporters = getSupporters()

    // 检查是否已存在
    const existingIndex = supporters.findIndex(s => s.name === trimmedName)

    if (existingIndex >= 0) {
      // 已存在，更新时间为当前时间
      supporters[existingIndex].created_at = new Date().toISOString()
    } else {
      // 新增
      supporters.push({
        name: trimmedName,
        created_at: new Date().toISOString()
      })
    }

    saveSupporters(supporters)

    return NextResponse.json({
      success: true,
      name: trimmedName,
      message: '声援成功！'
    })
  } catch (error) {
    return NextResponse.json({ error: '提交失败' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

const GITHUB_API = 'https://api.github.com/repos/OpenGithubs/github-weekly-rank/contents'
const RAW_BASE = 'https://raw.githubusercontent.com/OpenGithubs/github-weekly-rank/main'

export async function GET() {
  try {
    // 获取最新的文件列表
    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')

    // 先尝试获取当前月份的目录
    let folderUrl = `${GITHUB_API}/${year}/${month}`
    let folderResponse = await fetch(folderUrl, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })

    // 如果当前月份没有，尝试前一个月
    if (!folderResponse.ok) {
      const prevMonth = month === '01' ? '12' : String(parseInt(month) - 1).padStart(2, '0')
      const prevYear = month === '01' ? year - 1 : year
      folderUrl = `${GITHUB_API}/${prevYear}/${prevMonth}`
      folderResponse = await fetch(folderUrl, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      })
    }

    if (!folderResponse.ok) {
      throw new Error('Failed to fetch folder list')
    }

    const files = await folderResponse.json()

    // 找到最新的文件
    const latestFile = files
      .filter(f => f.name.endsWith('.md'))
      .sort((a, b) => b.name.localeCompare(a.name))[0]

    if (!latestFile) {
      throw new Error('No ranking file found')
    }

    // 构建文件路径
    const filePath = latestFile.path
    const rawUrl = `${RAW_BASE}/${filePath}`

    // 获取文件内容
    const contentResponse = await fetch(rawUrl)
    if (!contentResponse.ok) {
      throw new Error('Failed to fetch ranking content')
    }

    const content = await contentResponse.text()

    // 解析内容
    const parsed = parseRankingContent(content, latestFile.name)

    return NextResponse.json({
      success: true,
      data: {
        fileName: latestFile.name,
        filePath,
        ...parsed,
      }
    })
  } catch (error) {
    console.error('GitHub Rank API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch GitHub rankings' },
      { status: 500 }
    )
  }
}

function parseRankingContent(content, fileName) {
  // 提取标题
  const titleMatch = content.match(/#\s*(.+)/)
  const title = titleMatch ? titleMatch[1].trim() : 'GitHub Weekly Open Source Rankings'

  // 提取时间段
  const periodMatch = title.match(/\(([^)]+)\)/)
  const period = periodMatch ? periodMatch[1] : ''

  // 提取 Top 3
  const top3 = []
  const top3Pattern = /\*\*(\d+)\.\s*\*\*(.+?)\/([^\*]+)\*\s*-\s*([\d.]+[kK]?)\s*stars?,\s*\+([\d,]+)\s*weekly/i

  // 更简单的 Top 3 提取
  const lines = content.split('\n')
  let foundTop3 = false
  let top3Count = 0

  for (const line of lines) {
    if (line.match(/##\s*Top\s*3/i) || line.match(/##\s*Top\s*Projects/i)) {
      foundTop3 = true
      continue
    }
    if (foundTop3 && top3Count < 3 && line.match(/\*\*/)) {
      const match = line.match(/\*\*(\d+)\.\s*\*\*(.+?)\/([^\*]+)\*\s*-\s*([\d.]+[kK]?)\s*stars?,\s*\+([\d,]+)/i)
      if (match) {
        top3.push({
          rank: parseInt(match[1]),
          owner: match[2].trim(),
          repo: match[3].trim(),
          stars: match[4],
          weeklyGrowth: parseInt(match[5].replace(',', ''))
        })
        top3Count++
      }
    }
    if (foundTop3 && top3Count >= 3) break
  }

  // 提取完整排名表格
  const rankings = []
  const tableMatch = content.match(/\| Rank[^\n]*\n\|[^\n]*\n((?:\|[^\n]+\n)+)/)

  if (tableMatch) {
    const tableLines = tableMatch[1].trim().split('\n')
    for (const row of tableLines) {
      const cells = row.split('|').map(c => c.trim()).filter(c => c)
      if (cells.length >= 4 && cells[0] !== 'Rank') {
        const rank = parseInt(cells[0])
        if (!isNaN(rank)) {
          const projectPath = cells[1]
          const [owner, repo] = projectPath.split('/')
          rankings.push({
            rank,
            owner: owner || '',
            repo: repo || projectPath,
            stars: cells[2],
            weeklyGrowth: cells[3]
          })
        }
      }
    }
  }

  return {
    title,
    period,
    top3,
    rankings,
    lastUpdated: new Date().toISOString()
  }
}

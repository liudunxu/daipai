import { NextResponse } from 'next/server'
import { analyzeCompetitors, buildAnalysisReport } from '../../../../lib/seo/analyzer'
import { verifyRequest } from '../../../../lib/seo/auth'

// 验证token
function authCheck(request) {
  const result = verifyRequest(request)
  if (!result.valid) {
    return { error: result.error, response: NextResponse.json({ error: result.error }, { status: 401 }) }
  }
  return { user: result.payload }
}

// GET 分析关键词竞品
export async function GET(request) {
  const auth = authCheck(request)
  if (auth.error) return auth.response

  try {
    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get('keyword')

    if (!keyword) {
      return NextResponse.json({ error: '关键词不能为空' }, { status: 400 })
    }

    console.log(`开始分析关键词: ${keyword}`)

    // 调用分析函数
    const analysis = await analyzeCompetitors(keyword)

    // 构建报告
    const report = buildAnalysisReport(analysis)

    return NextResponse.json({
      success: true,
      keyword,
      analysis,
      report,
      totalCompetitors: analysis.totalAnalyzed
    })
  } catch (error) {
    console.error('竞品分析失败:', error)
    return NextResponse.json({
      success: false,
      error: `分析失败: ${error.message}`
    }, { status: 500 })
  }
}

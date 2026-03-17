# 极客观察 - AI科技经济资讯

一个聚合AI、科技、经济相关资讯的导航网站，同时提供多种实用在线工具。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 网站特色

- **资讯聚合**: 混排AI、科技、经济相关资讯，聚合36氪、虎嗅、IT之家、经济时报等来源
- **实用工具**: 集成多种在线工具，包括摇骰子、姓名生成、星座配对、抽签占卜、股票回测等
- **生活服务**: 包含黄历查询、婚庆吉日、生日祝福、手机号码测吉凶等日常实用功能

## 页面导航

| 分类 | 页面 | 说明 |
|------|------|------|
| 首页 | / | 资讯聚合首页 |
| AI | /ai | AI工具导航 |
| | /ai/claude | Claude使用指南 |
| | /ai/coze | Coze使用指南 |
| | /ai/deepseek | DeepSeek使用指南 |
| | /ai/perplexity | Perplexity使用指南 |
| 工具 | /nav | 工具导航页 |
| | /dice | 摇骰子 |
| | /daipai | 戴牌算命 |
| | /chouqian | 抽签占卜 |
| | /names | 姓名大全 |
| | /phone | 手机号码测吉凶 |
| | /stock | 股票预测 |
| | /stock/backtest | 股票回测 |
| 生活 | /huangli | 今日黄历 |
| | /wedding | 婚庆吉日 |
| | /birthday | 生日祝福 |
| | /cake | 生日蛋糕 |
| 占卜 | /tarot | 塔罗牌占卜 |
| | /shengxiao | 十二生肖 |
| | /xingzuo | 星座运势 |
| | /match | 星座配对 |
| | /face | 面相分析 |
| | /mind | 心理测试 |
| 其他 | /trending | 热门趋势 |
| | /about | 关于我们 |
| | /features | 功能介绍 |

## 技术栈

- Next.js 14 (App Router)
- Tailwind CSS
- Vercel KV (Redis) - 数据存储

## 目录结构

```
src/
├── app/
│   ├── layout.js        # 根布局
│   ├── page.js          # 首页
│   ├── globals.css      # 全局样式
│   ├── api/             # API 路由
│   │   ├── supporters/ # 声援API
│   │   ├── daipai/      # 戴牌算命API
│   │   └── stock/       # 股票API
│   ├── ai/              # AI相关页面
│   ├── tool/            # 工具页面
│   ├── stock/           # 股票页面
│   ├── guoxue/          # 国学页面
│   └── ...              # 其他页面
├── components/          # React 组件
└── lib/                 # 工具函数
```

## 部署

推荐部署到 Vercel：

```bash
# 使用 Vercel CLI
npm i -g vercel
vercel
```

或者推送到 GitHub，在 Vercel 上导入项目自动部署。

## License

MIT

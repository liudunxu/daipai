# 极客观察 - AI科技经济资讯与实用工具平台

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
- **实用工具**: 集成多种在线工具，包括BMI计算、身高评估、睡眠推荐、密码生成、摇骰子等
- **生活服务**: 包含黄历查询、婚庆吉日、生日祝福、手机号码测吉凶等日常实用功能
- **玄学命理**: 八字、星座、生肖、运势、塔罗牌、抽签占卜等传统文化的现代化呈现
- **儿童专区**: BMI计算、身高评估、睡眠推荐等儿童健康成长工具

## 页面导航

### 玄学命理
| 页面 | 说明 |
|------|------|
| /today | 今日运势 |
| /xingzuo | 星座运势 |
| /shengxiao | 十二生肖 |
| /fate | 2026年运势 |
| /huangli | 老黄历 |
| /chouqian | 在线抽签 |
| /bazi | 八字算命 |
| /chenggu | 称骨算命 |
| /tarot | 塔罗牌测试 |
| /guoxue/shouqianshou | 手相术 |

### 爱情配对
| 页面 | 说明 |
|------|------|
| /match | 姓名配对 |
| /phone | 手机号测运势 |
| /mind | 心理测试 |

### 生活娱乐
| 页面 | 说明 |
|------|------|
| /birthday | 生日密语 |
| /cake | 生日蛋糕 |
| /wedding | 结婚吉日 |
| /couple | 情侣头像 |
| /avatar | 节日头像 |
| /face | AI撞脸测试 |
| /dice | 摇骰子 |
| /blessing | 祝福语生成 |

### 股票财经
| 页面 | 说明 |
|------|------|
| /stock | 今天会涨吗 |
| /stock/backtest | 股票回测 |
| /polymarket | Polymarket预测市场 |

### AI工具
| 页面 | 说明 |
|------|------|
| /ai | AI工具导航 |
| /ai/claude | Claude指南 |
| /ai/deepseek | DeepSeek指南 |
| /ai/coze | Coze教程 |
| /ai/perplexity | Perplexity |
| /prompt | AI提示词 |
| /maic | OpenMAIC |

### 实用工具（儿童健康）
| 页面 | 说明 |
|------|------|
| /tool | 开发工具 |
| /tool/password | 密码生成 |
| /tool/bmi | BMI计算器 |
| /tool/height | 身高评估 |
| /tool/sleep | 睡眠推荐 |
| /tool/lucky | 运势测算 |
| /tool/huoxing | 火星文转换 |

### 资讯热点
| 页面 | 说明 |
|------|------|
| /trending | 热搜榜 |
| /trend/2026 | 2026话题 |
| /todayinhistory | 历史上的今天 |
| /nvidia | 黄仁勋GTC |
| /alibaba | 阿里架构 |
| /news/openclaw | QClaw资讯 |
| /daipai | 足部护理 |

### 其他
| 页面 | 说明 |
|------|------|
| /nav | 导航页（全部入口） |
| /guoxue | 国学院 |
| /pua | PUA话术 |
| /features | 功能介绍 |
| /about | 关于我们 |
| /contact | 联系我们 |
| /privacy | 隐私政策 |
| /terms | 用户协议 |

## 技术栈

- Next.js 14 (App Router)
- Tailwind CSS 3.4
- 数据存储: JSON 文件 / Vercel KV (Redis)

## 目录结构

```
src/
├── app/
│   ├── page.js              # 首页
│   ├── layout.js            # 根布局
│   ├── globals.css         # 全局样式
│   ├── nav/page.js         # 导航页面
│   ├── api/                # API 路由
│   ├── ai/                 # AI工具
│   ├── tool/               # 实用工具
│   │   ├── bmi/           # BMI计算器
│   │   ├── height/        # 身高评估
│   │   ├── sleep/         # 睡眠推荐
│   │   └── ...
│   ├── stock/              # 股票
│   ├── bazi/               # 八字
│   ├── xingzuo/            # 星座
│   └── ...
├── components/             # React 组件
└── lib/                    # 工具函数
```

## 部署

推荐部署到 Vercel：

```bash
# Vercel CLI
npm i -g vercel
vercel

# 或者 GitHub 推送后自动部署
```

## License

MIT
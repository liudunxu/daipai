# 项目规范

## 项目概述

这是一个 Next.js 14 + Tailwind CSS 开发的多功能工具类网站「极客观察」，包含多种在线工具和娱乐功能。

**网址**: https://www.zkwatcher.top

**GitHub**: https://github.com/dundun/claude-code

主要功能分类：
- **AI 工具**: Claude、DeepSeek、Coze、Perplexity 等 AI 服务介绍
- **玄学命理**: 八字、星座、运势、生肖、算命、抽签、起名等
- **生活工具**: 密码生成器、幸运数字、黄历日期查询等
- **娱乐功能**: 塔罗牌、头像生成、婚礼请帖、蛋糕祝福等
- **股票财经**: A股/港股/美股预测、大佬持仓追踪
- **资讯热点**: 热搜榜、GitHub热门、历史上的今天等

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS 3.4
- **数据存储**: JSON 文件 (data/) + Vercel KV (生产)
- **部署平台**: Vercel
- **域名**: Cloudflare 托管

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 文件结构

```
claude-code/
├── src/
│   ├── app/
│   │   ├── page.js           # 首页
│   │   ├── layout.js         # 根布局
│   │   ├── globals.css       # 全局样式
│   │   ├── nav/page.js       # 导航页面（所有入口）
│   │   │
│   │   ├── api/              # API 路由
│   │   │   ├── supporters/   # 声援 API
│   │   │   ├── daipai/       # 代拍服务
│   │   │   ├── news/         # 新闻资讯
│   │   │   ├── seo/          # SEO文章生成
│   │   │   │   ├── article/
│   │   │   │   ├── daily-task/
│   │   │   │   ├── generate/
│   │   │   │   ├── keywords/
│   │   │   │   ├── search/
│   │   │   │   ├── verify/
│   │   │   │   └── wechat/
│   │   │   ├── stock/        # 股票相关
│   │   │   │   ├── record/
│   │   │   │   ├── portfolio/
│   │   │   │   └── history/
│   │   │   └── whale/        # 投资大佬持仓
│   │   │
│   │   ├── ai/               # AI 工具页面
│   │   │   ├── claude/
│   │   │   ├── deepseek/
│   │   │   ├── coze/
│   │   │   └── perplexity/
│   │   │
│   │   ├── tool/             # 工具类页面
│   │   │   ├── password/
│   │   │   ├── bmi/
│   │   │   ├── height/
│   │   │   ├── sleep/
│   │   │   ├── lucky/
│   │   │   ├── huoxing/
│   │   │   ├── unit/
│   │   │   └── countdown/
│   │   │
│   │   ├── bazi/             # 八字算命
│   │   ├── xingzuo/          # 星座
│   │   ├── shengxiao/        # 生肖
│   │   ├── fate/             # 运势
│   │   ├── tarot/            # 塔罗牌
│   │   ├── stock/            # 股票
│   │   │   ├── predict/      # A股预测
│   │   │   ├── hk-predict/   # 港股预测
│   │   │   └── us-predict/   # 美股预测
│   │   ├── guru/             # 大佬持仓
│   │   ├── seo/              # SEO文章
│   │   ├── article/          # 文章详情
│   │   └── ...
│   │   │
│   │   └── components/       # 组件目录
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       ├── AdBanner.jsx
│   │       ├── WechatGroup.jsx
│   │       └── ...
│   │
│   └── lib/                  # 工具库
│       └── utils.js
│
├── data/                     # 数据存储目录
│   └── supporters.json      # 声援数据
├── public/                   # 静态资源
│   └── images/
├── docs/                     # 文档
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 页面分类

### 1. AI 工具 (src/app/ai/)
AI 服务介绍和教程页面。

| 页面 | 路由 | 说明 |
|------|------|------|
| AI导航 | /ai | AI工具汇总 |
| Claude | /ai/claude | Claude使用指南 |
| DeepSeek | /ai/deepseek | DeepSeek教程 |
| Coze | /ai/coze | Coze使用教程 |
| Perplexity | /ai/perplexity | Perplexity介绍 |

### 2. 玄学命理 (src/app/*)
传统文化现代化呈现。

| 页面 | 路由 | 说明 |
|------|------|------|
| 八字算命 | /bazi | 八字排盘分析 |
| 星座运势 | /xingzuo | 星座详情 |
| 生肖 | /shengxiao | 十二生肖 |
| 今日运势 | /today | 每日运势 |
| 老黄历 | /huangli | 黄历查询 |
| 抽签 | /chouqian | 在线抽签 |
| 称骨算命 | /chenggu | 称骨算法 |
| 塔罗牌 | /tarot | 塔罗牌测试 |
| 手相 | /guoxue/shouqianshou | 手相术 |
| 姓名配对 | /match | 缘分配对 |
| 手机号测运势 | /phone | 号码吉凶 |
| 心理测试 | /mind | 心理测试 |

### 3. 生活工具 (src/app/tool/)
日常实用工具。

| 页面 | 路由 | 说明 |
|------|------|------|
| 工具导航 | /tool | 工具汇总 |
| 密码生成 | /tool/password | 密码生成器 |
| BMI计算 | /tool/bmi | 体质指数 |
| 身高评估 | /tool/height | 儿童身高 |
| 睡眠推荐 | /tool/sleep | 睡眠建议 |
| 火星文 | /tool/huoxing | 火星文转换 |
| 单位换算 | /tool/unit | 单位转换 |
| 倒计时 | /tool/countdown | 倒数日 |
| 运势测算 | /tool/lucky | 2026年运势 |

### 4. 娱乐功能
头像生成、祝福语、生日相关等。

| 页面 | 路由 | 说明 |
|------|------|------|
| 情侣头像 | /couple | 头像生成 |
| 节日头像 | /avatar | 节日头像 |
| 生日蛋糕 | /cake | 蛋糕祝福 |
| 婚礼吉日 | /wedding | 结婚吉日 |
| 祝福语 | /blessing | 祝福语生成 |
| 摇骰子 | /dice | 骰子游戏 |
| AI撞脸 | /face | 人脸匹配 |
| 生日密语 | /birthday | 生日秘密 |

### 5. 股票财经 (src/app/stock/)
股票相关功能。

| 页面 | 路由 | 说明 |
|------|------|------|
| 今天会涨吗 | /stock | 股票预测首页 |
| A股预测 | /stock/predict | A股智能预测 |
| 港股预测 | /stock/hk-predict | 港股智能预测 |
| 美股预测 | /stock/us-predict | 美股智能预测 |
| 大佬持仓 | /guru | 持仓追踪 |

### 6. 资讯热点
实时资讯和热点聚合。

| 页面 | 路由 | 说明 |
|------|------|------|
| 热搜榜 | /trending | 微博/知乎/百度热搜 |
| GitHub热门 | /github-rank | 热门开源项目 |
| 2026话题 | /trend/2026 | 热门话题聚合 |
| 历史上的今天 | /todayinhistory | 历史事件 |
| Claude源码泄漏 | /claude-code-leak | 资讯页面 |
| Nvidia GTC | /nvidia | 资讯页面 |
| 阿里架构 | /alibaba | 资讯页面 |

## API 设计

### 现有 API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET/POST | /api/supporters | 声援者列表 |
| GET/POST | /api/daipai | 代拍服务 |
| GET | /api/news | 新闻资讯 |
| GET/POST | /api/stock/record | 股票记录 |
| GET/POST | /api/stock/portfolio | 股票组合 |
| GET | /api/stock/history | 历史数据 |
| GET | /api/whale | 大佬持仓 |
| GET | /api/seo/generate | SEO文章生成 |
| GET | /api/seo/article | 文章详情 |
| GET | /api/seo/keywords | 关键词列表 |
| GET | /api/seo/daily-task | 每日任务 |
| POST | /api/seo/search | 搜索验证 |
| POST | /api/seo/verify | URL验证 |
| POST | /api/seo/wechat | 微信公众号 |

### API 响应格式

```json
{
  "success": true,
  "data": {},
  "message": "操作成功"
}
```

### 错误处理

```json
{
  "success": false,
  "error": "错误描述",
  "code": "ERROR_CODE"
}
```

### 容错处理
- 前端调用 API 时必须使用 try-catch 包裹
- API 不可用时显示友好提示，不阻止页面交互

## 开发规范

### 任务执行规范
- **自动判定复杂度**：根据以下条件判断任务复杂度
  - 涉及 3 个以上文件
  - 需要新增页面、路由或 API
  - 需要引入新的依赖库
  - 涉及数据库、第三方服务集成
  - 需求不明确或有多条实现路径
- **复杂任务使用 plan 模式**：
  1. 使用 `EnterPlanMode` 进入计划模式
  2. 分析代码库，设计实现方案
  3. 使用 `TaskCreate` 创建任务清单
  4. 使用 `TaskUpdate` 设置任务依赖关系
  5. 按顺序执行任务
- **简单任务直接执行**：如修改样式、修复 bug、更新文案等可直接执行

### 组件规范
- 组件文件使用 PascalCase 命名（如 `Header.jsx`）
- 组件放在 `src/components/` 目录
- 每个组件功能单一，代码简洁

### 页面管理规范
- **每次新增或删除页面，必须同步更新 `/nav` 导航页面的链接**
- 保持导航页面包含所有有效页面的入口

### Tailwind CSS 规范
- 使用 Tailwind 工具类进行样式开发
- 自定义颜色在 `tailwind.config.js` 的 `theme.extend.colors` 中配置

## Git 提交规范

### 自动提交
**每次修改完代码后，必须自动提交 git 记录**

- 使用 `git add` 暂存修改的文件
- 使用 `git commit` 提交，格式：`feat: xxx` 或 `fix: xxx`

### 构建检查
**推送到 GitHub 之前，必须确保本地构建通过**

- 运行 `npm run build` 确保无编译错误
- 如有错误自动修复后再次构建验证
- 确认通过后再执行 `git push`

### 提交信息格式
```
feat: 添加xxx功能
fix: 修复xxx问题
style: 优化xxx样式
refactor: 重构xxx代码
docs: 更新xxx文档
perf: 优化xxx性能
```

## 部署到 Vercel

```bash
# 方法1: Vercel CLI
npm i -g vercel
vercel

# 方法2: GitHub 推送后自动部署
# 1. 推送到 GitHub
# 2. 在 vercel.com 导入项目
# 3. 自动部署
```

## 注意事项

1. 外部图片链接可能不稳定，建议使用本地图片或 base64
2. 声援数据存储在 `data/supporters.json`
3. Vercel 部署后 JSON 文件数据是临时的（无状态），每次部署会重置
   - 如需持久化数据，可使用 Vercel KV (Redis) 或其他数据库
4. 项目配置了 Playwright MCP 服务用于测试和自动化
5. API 域名使用 Cloudflare Workers (predict-api-production.up.railway.app → *.workers.dev)

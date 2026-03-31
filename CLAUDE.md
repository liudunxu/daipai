# 项目规范

## 项目概述

这是一个 Next.js 14 + Tailwind CSS 开发的多功能工具类网站，包含多种在线工具和娱乐功能。

主要功能分类：
- **AI 工具**: Claude、DeepSeek、Coze、Perplexity 等 AI 服务介绍
- **玄学命理**: 八字、星座、运势、生肖、算命、抽签、起名等
- **生活工具**: 密码生成器、幸运数字、黄历日期查询等
- **娱乐功能**: 塔罗牌、头像生成、婚礼请帖、蛋糕祝福等

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS 3.4
- **数据存储**: JSON 文件 (data/supporters.json)
- **部署平台**: Vercel（推荐）

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
│   ├── app/                  # Next.js App Router 页面
│   │   ├── page.js           # 首页
│   │   ├── layout.js         # 根布局
│   │   ├── globals.css       # 全局样式
│   │   ├── nav/page.js       # 导航页面（所有入口）
│   │   ├── api/              # API 路由
│   │   │   └── supporters/   # 声援 API
│   │   ├── ai/               # AI 工具页面
│   │   ├── bazi/              # 八字算命
│   │   ├── xingzuo/           # 星座
│   │   ├── shengxiao/         # 生肖
│   │   ├── fate/              # 算命
│   │   ├── tarot/             # 塔罗牌
│   │   ├── tool/              # 工具类页面
│   │   ├── stock/             # 股票相关
│   │   └── ...                # 其他页面
│   └── components/           # 组件目录
│       └── ...                # 共用组件
├── data/                    # 数据存储目录
│   └── supporters.json      # 声援数据
├── public/                  # 静态资源
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

> 注：新增页面需同步更新 `/nav` 导航页面

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

## API 规范

### 现有接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET/POST | /api/supporters | 声援者列表 |
| GET/POST | /api/daipai | 代拍服务 |
| GET | /api/news | 新闻资讯 |
| GET/POST | /api/stock/record | 股票记录 |
| GET/POST | /api/stock/portfolio | 股票组合 |
| GET | /api/stock/history | 股票历史数据 |
| GET | /api/whale | 投资大佬持仓（WhaleWisdom） |
| GET | /api/seo/generate | SEO文章生成 |

### 容错处理
- 前端调用 API 时必须使用 try-catch 包裹
- API 不可用时显示友好提示，不阻止页面交互

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

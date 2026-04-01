# 架构文档

本文档描述「极客观察」项目的技术架构和设计决策。

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Next.js 14 | App Router 模式 |
| 样式 | Tailwind CSS 3.4 | 工具类 CSS |
| 数据存储 | JSON / Vercel KV | 本地 JSON 开发，Redis 生产 |
| 部署 | Vercel | CI/CD 自动部署 |

## 目录结构

```
claude-code/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.js             # 首页
│   │   ├── layout.js           # 根布局
│   │   ├── globals.css         # 全局样式
│   │   ├── nav/page.js        # 导航页面（入口汇总）
│   │   │
│   │   ├── api/               # API 路由
│   │   │   ├── supporters/    # 声援数据
│   │   │   ├── daipai/        # 代拍服务
│   │   │   ├── news/          # 新闻资讯
│   │   │   ├── stock/         # 股票相关
│   │   │   │   ├── record/
│   │   │   │   ├── portfolio/
│   │   │   │   ├── history/
│   │   │   │   └── backtest/
│   │   │   ├── whale/         # 投资大佬持仓
│   │   │   └── seo/           # SEO 文章生成
│   │   │
│   │   ├── ai/                # AI 工具
│   │   │   ├── claude/
│   │   │   ├── deepseek/
│   │   │   ├── coze/
│   │   │   └── perplexity/
│   │   │
│   │   ├── tool/              # 实用工具
│   │   │   ├── password/
│   │   │   ├── bmi/
│   │   │   ├── height/
│   │   │   ├── sleep/
│   │   │   ├── lucky/
│   │   │   ├── huoxing/
│   │   │   ├── unit/
│   │   │   └── countdown/
│   │   │
│   │   ├── bazi/              # 八字算命
│   │   ├── xingzuo/           # 星座
│   │   ├── shengxiao/         # 生肖
│   │   ├── fate/              # 运势
│   │   ├── tarot/             # 塔罗牌
│   │   ├── stock/             # 股票
│   │   │   └── backtest/
│   │   ├── match/             # 配对
│   │   ├── wedding/           # 婚礼
│   │   ├── avatar/            # 头像生成
│   │   ├── trending/          # 热搜
│   │   └── ...
│   │
│   └── components/            # React 组件
│       ├── Header.jsx
│       ├── Footer.jsx
│       └── ...
│
├── data/                       # 本地数据（开发用）
│   └── supporters.json
│
├── public/                     # 静态资源
│   └── images/
│
├── docs/                       # 文档
│   └── SPEC.md                # 页面规格说明
│
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
| 称骨算命 | /chegnu | 称骨算法 |
| 塔罗牌 | /tarot | 塔罗牌测试 |
| 手相 | /guoxue/shouqianshou | 手相术 |

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

### 5. 股票财经 (src/app/stock/)
股票相关功能。

| 页面 | 路由 | 说明 |
|------|------|------|
| 今日涨跌 | /stock | 股票预测 |
| 股票回测 | /stock/backtest | 回测系统 |
| 投资大佬 | /guru | 持仓追踪 |

## API 设计

### RESTful 规范

所有 API 遵循 RESTful 设计：

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/[resource] | 获取列表/详情 |
| POST | /api/[resource] | 创建资源 |
| PUT | /api/[resource] | 更新资源 |
| DELETE | /api/[resource] | 删除资源 |

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
| GET | /api/seo/generate | SEO文章 |

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

## 数据存储

### 开发环境
- JSON 文件存储在 `data/` 目录
- 适用于小规模数据

### 生产环境
- Vercel KV (Redis) 存储声援等动态数据
- JSON 文件数据每次部署会重置

## 组件设计

### 组件命名
- 文件名：PascalCase (如 `Header.jsx`)
- 组件名：PascalCase

### 组件分类

| 目录 | 说明 |
|------|------|
| /src/components/ui/ | 基础 UI 组件 |
| /src/components/layout/ | 布局组件 |
| /src/components/features/ | 功能组件 |

## 设计模式

### 1. Server Components
- 默认使用 Server Components
- 减少客户端 JS 体积

### 2. Client Components
- 需要交互的组件使用 `'use client'`
- 表单、按钮、动画等

### 3. 样式方案
- Tailwind CSS 优先
- 避免内联样式
- 主题色在 tailwind.config.js 集中配置

## 性能优化

1. **图片优化**：使用 Next.js Image 组件
2. **代码分割**：动态导入大组件
3. **缓存策略**：API 路由添加适当缓存
4. **预加载**：关键页面预加载

## 安全考虑

1. **API 保护**：敏感接口添加权限验证
2. **输入验证**：所有用户输入验证
3. **XSS 防护**：React 自动转义
4. **CSRF**：Next.js 默认防护

## 扩展性

### 添加新页面
1. 在 `src/app/` 下创建页面
2. 同步更新 `/nav` 导航页面
3. 如有 API，创建对应路由

### 添加新 API
1. 在 `src/app/api/` 下创建路由
2. 遵循 RESTful 规范
3. 添加错误处理

# 极客观察

> AI 科技经济资讯与实用工具平台

聚合 AI、科技、经济相关资讯的导航网站，同时提供多种实用在线工具。

[在线访问](https://jike観察.com) · [快速开始](#快速开始) · [功能导航](#功能导航)

---

## 快速开始

```bash
# 克隆项目
git clone https://github.com/dunxuan/claude-code.git
cd claude-code

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

访问 http://localhost:3000

---

## 功能导航

### AI 工具
| 页面 | 说明 |
|------|------|
| [/ai](src/app/ai/page.js) | AI 工具导航 |
| [/ai/claude](src/app/ai/claude/page.js) | Claude 使用指南 |
| [/ai/deepseek](src/app/ai/deepseek/page.js) | DeepSeek 教程 |
| [/ai/coze](src/app/ai/coze/page.js) | Coze 使用教程 |

### 玄学命理
| 页面 | 说明 |
|------|------|
| [/bazi](src/app/bazi/page.js) | 八字算命 |
| [/xingzuo](src/app/xingzuo/page.js) | 星座运势 |
| [/shengxiao](src/app/shengxiao/page.js) | 十二生肖 |
| [/tarot](src/app/tarot/page.js) | 塔罗牌测试 |
| [/chouqian](src/app/chouqian/page.js) | 在线抽签 |

### 实用工具
| 页面 | 说明 |
|------|------|
| [/tool](src/app/tool/page.js) | 工具导航 |
| [/tool/password](src/app/tool/password/page.js) | 密码生成器 |
| [/tool/bmi](src/app/tool/bmi/page.js) | BMI 计算器 |
| [/tool/height](src/app/tool/height/page.js) | 身高评估 |
| [/tool/sleep](src/app/tool/sleep/page.js) | 睡眠推荐 |

### 股票财经
| 页面 | 说明 |
|------|------|
| [/stock](src/app/stock/page.js) | 今日涨跌 |
| [/stock/backtest](src/app/stock/backtest/page.js) | 股票回测 |
| [/guru](src/app/guru/page.js) | 投资大佬持仓 |

### 生活娱乐
| 页面 | 说明 |
|------|------|
| [/avatar](src/app/avatar/page.js) | 节日头像 |
| [/cake](src/app/cake/page.js) | 生日蛋糕 |
| [/wedding](src/app/wedding/page.js) | 结婚吉日 |
| [/blessing](src/app/blessing/page.js) | 祝福语生成 |

### 资讯热点
| 页面 | 说明 |
|------|------|
| [/trending](src/app/trending/page.js) | 热搜榜 |
| [/todayinhistory](src/app/todayinhistory/page.js) | 历史上的今天 |

---

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS 3.4
- **部署**: Vercel

## 项目文档

| 文档 | 说明 |
|------|------|
| [CLAUDE.md](CLAUDE.md) | Claude Code 开发规范 |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 技术架构文档 |
| [ROADMAP.md](ROADMAP.md) | 产品路线图 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 贡献指南 |
| [DEPLOY.md](DEPLOY.md) | 部署指南 |

## 目录结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.js            # 首页
│   ├── nav/               # 导航页
│   ├── api/               # API 路由
│   ├── ai/                # AI 工具
│   ├── tool/              # 实用工具
│   ├── bazi/              # 八字算命
│   ├── xingzuo/           # 星座
│   ├── stock/             # 股票
│   └── ...
├── components/             # React 组件
└── lib/                    # 工具函数
```

## 部署

推荐部署到 Vercel：

```bash
# Vercel CLI
npm i -g vercel
vercel --prod
```

详细部署说明请参考 [DEPLOY.md](DEPLOY.md)。

---

## License

MIT

# AGENT.md - Claude Code 行为规范

本文件定义 Claude Code 在本项目中的行为规范和工作流程。

## 项目概述

- **项目名称**: 极客观察
- **类型**: Next.js 14 多功能工具类网站
- **核心功能**: AI工具导航、玄学命理、生活工具、儿童健康工具、资讯聚合

## 工作流程

### 1. 任务评估
- 涉及 3+ 文件修改需进入计划模式
- 新增页面/路由/API 需要规划
- 引入新依赖或数据库集成需要规划
- 简单任务（样式修改、bug修复、文案更新）可直接执行

### 2. 代码开发
- 组件使用 PascalCase 命名（如 `Header.jsx`）
- 页面放在 `src/app/` 目录
- 组件放在 `src/components/` 目录
- 使用 Tailwind CSS 进行样式开发

### 3. 页面管理（强制要求）
- **每次新增或删除页面，必须同步更新 `/nav` 导航页面的链接**
- 保持导航页面包含所有有效页面的入口

### 4. Git 提交规范
- 每次修改完成后自动提交
- 提交格式: `feat: xxx`, `fix: xxx`, `style: xxx`, `refactor: xxx`, `docs: xxx`
- 提交后自动推送到 GitHub

### 5. 构建验证（强制要求）
- 推送到 GitHub 之前必须本地构建通过
- 运行 `npm run build` 确保无编译错误
- 如有错误自动修复后再次构建验证

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

### 容错处理
- 前端调用 API 时必须使用 try-catch 包裹
- API 不可用时显示友好提示，不阻止页面交互

## 注意事项

1. 外部图片链接可能不稳定，建议使用本地图片或 base64
2. JSON 文件数据是临时的，每次部署会重置
3. 儿童类工具页面交互优先使用选择器，减少手动输入

## 快速命令

```bash
# 安装依赖
npm install

# 开发
npm run dev

# 构建
npm run build

# 部署
vercel 或 git push
```
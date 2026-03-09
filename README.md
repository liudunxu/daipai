# 汗脚烦恼 - 东北雨姐推荐

一个关于足部护理的营销推广单页，风格采用东北雨姐的口气，支持声援功能。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 页面预览

- 顶部：东北雨姐头像 + 推荐标签
- 内容：汗脚困扰 → 声援表单 → 解决方法 → 日常小贴士
- 结尾：行动召唤

## 技术栈

- Next.js 14 (App Router)
- Tailwind CSS
- JSON 文件存储

## 部署

推荐部署到 Vercel：

```bash
# 使用 Vercel CLI
npm i -g vercel
vercel
```

或者推送到 GitHub，在 Vercel 上导入项目自动部署。

## 目录结构

```
src/
├── app/
│   ├── layout.js        # 根布局
│   ├── page.js          # 首页
│   ├── globals.css      # 全局样式
│   └── api/
│       └── supporters/  # 声援 API
└── components/          # React 组件
```

## License

MIT

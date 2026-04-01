# 部署指南

本文档说明如何将「极客观察」部署到 Vercel。

## 快速部署

### 方法一：Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署（项目根目录）
vercel

# 生产环境部署
vercel --prod
```

### 方法二：GitHub 集成

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择 GitHub 仓库
5. 点击 "Deploy"

## 部署配置

### 环境变量

在 Vercel 项目设置中添加：

| 变量名 | 说明 | 必需 |
|--------|------|------|
| KV_URL | Redis 连接地址 | 否 |
| KV_REST_API_URL | Redis REST API | 否 |
| KV_REST_API_TOKEN | Redis 认证令牌 | 否 |

### 框架预设

Vercel 会自动检测 Next.js，无需额外配置。

## 域名配置

### 自定义域名

1. 进入项目 Settings → Domains
2. 添加自定义域名
3. 按照提示配置 DNS

### 国内访问

如需国内访问，可配置：
- 阿里云 CDN
- 腾讯云 CDN
- 又拍云

## 构建配置

### 构建命令
```
npm run build
```

### 输出目录
```
.next
```

### Node.js 版本
```
18.x 或更高
```

## 数据存储

### 本地 JSON

开发环境使用 `data/` 目录下的 JSON 文件。

### Vercel KV (Redis)

生产环境推荐使用 Vercel KV 存储动态数据：

```javascript
// 使用示例
import { kv } from '@vercel/kv'

// 设置值
await kv.set('key', 'value')

// 获取值
const value = await kv.get('key')
```

### 注意事项

- JSON 文件数据每次部署会重置
- 生产环境务必使用数据库存储重要数据

## 性能优化

### 缓存配置

Next.js 默认配置已优化：
- 静态资源缓存
- API 路由缓存
- 图片优化

### 图片优化

使用 Next.js Image 组件：
```jsx
import Image from 'next/image'

<Image
  src="/images/photo.jpg"
  alt="描述"
  width={500}
  height={300}
/>
```

### 部署后验证

1. 访问部署的 URL 确认正常
2. 测试关键功能
3. 检查控制台错误

## 常见问题

### 构建失败

1. 检查 Node.js 版本
2. 清理缓存：`vercel rm` 后重新部署
3. 查看构建日志定位问题

### 环境变量不生效

1. 确认变量已保存
2. 重新部署（不是重新构建）
3. 检查变量名称拼写

### 图片加载失败

1. 检查图片路径
2. 确认图片在 public 目录
3. 使用绝对路径引用

## 监控与日志

### Vercel Analytics

项目已配置 Vercel Analytics：

```javascript
// src/app/layout.js
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 查看日志

```bash
# 查看实时日志
vercel logs my-project

# 查看指定部署日志
vercel logs my-project --deployment-id=xxx
```

## CI/CD

### GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 需要的 Secrets

在 GitHub 仓库 Settings → Secrets 中添加：

| Secret | 说明 |
|--------|------|
| VERCEL_TOKEN | Vercel API Token |
| VERCEL_ORG_ID | Organization ID |
| VERCEL_PROJECT_ID | Project ID |

## 回滚

### Vercel CLI
```bash
vercel rollback [deployment-id]
```

### Vercel Dashboard
1. 进入 Deployments
2. 选择历史版本
3. 点击 "..." → "Promote to Production"

# 贡献指南

感谢您对「极客观察」项目的关注！欢迎贡献代码、文档或提出建议。

## 如何贡献

### 1. 报告问题

发现 Bug 或有功能建议？

1. 搜索现有 Issue，避免重复
2. 创建新 Issue，描述清晰
3. 包含复现步骤（Bug）
4. 包含使用场景（功能）

### 2. 提交代码

#### 开发流程

1. **Fork 仓库**
   ```bash
   git clone https://github.com/YOUR_USERNAME/claude-code.git
   cd claude-code
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **开发调试**
   ```bash
   npm install
   npm run dev
   ```

4. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   ```

5. **推送并创建 PR**
   ```bash
   git push origin feature/your-feature-name
   ```

#### 提交规范

| 类型 | 说明 |
|------|------|
| feat | 新功能 |
| fix | Bug 修复 |
| style | 样式调整 |
| refactor | 重构 |
| docs | 文档更新 |
| perf | 性能优化 |
| test | 测试相关 |
| chore | 构建/工具 |

格式：`type: 简短描述`

### 3. 添加新页面

新增页面需要：

1. 在 `src/app/` 下创建页面
2. 更新 `/nav` 导航页面添加链接
3. 如有 API，在 `src/app/api/` 下创建
4. 添加适当的 Meta 信息（title, description）

#### 页面模板

```jsx
export const metadata = {
  title: '页面标题',
  description: '页面描述',
}

export default function PageName() {
  return (
    <main>
      <h1>页面标题</h1>
      {/* 内容 */}
    </main>
  )
}
```

### 4. 添加新 API

```javascript
// src/app/api/example/route.js
export async function GET(request) {
  try {
    const data = { /* 响应数据 */ }
    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
```

## 代码规范

### React 组件

- 使用函数组件
- 组件名使用 PascalCase
- Props 解构使用

```jsx
// Good
function UserCard({ name, avatar, onClick }) {
  return (
    <div onClick={onClick}>
      <img src={avatar} alt={name} />
      <span>{name}</span>
    </div>
  )
}

// Avoid
function UserCard(props) {
  return (
    <div onClick={props.onClick}>
      <img src={props.avatar} />
    </div>
  )
}
```

### Tailwind CSS

- 优先使用工具类
- 避免内联样式
- 响应式前缀清晰

```jsx
// Good
<div className="p-4 md:p-6 lg:p-8">
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    按钮
  </button>
</div>

// Avoid
<div style={{ padding: '16px' }}>
  <button style={{ backgroundColor: 'blue', padding: '8px 16px' }}>
    按钮
  </button>
</div>
```

### 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 页面 | kebab-case | user-profile.js |
| 组件 | PascalCase | UserCard.jsx |
| 工具函数 | camelCase | formatDate.js |
| API 路由 | kebab-case | user-info/route.js |

## 测试

### 本地测试

```bash
# 开发环境测试
npm run dev

# 构建测试
npm run build

# 生产环境测试
npm run start
```

### Playwright 测试

项目配置了 Playwright MCP 服务用于自动化测试。

## 项目结构

```
src/
├── app/              # 页面
│   ├── page.js      # 首页
│   ├── nav/         # 导航页
│   └── api/         # API
├── components/       # 组件
└── lib/             # 工具
```

## 决策记录

重大决策会记录在 Issue 和 Commit 中：

- 新功能讨论 → Issue
- 技术选型 → ARCHITECTURE.md
- 产品规划 → ROADMAP.md

## 联系方式

- GitHub Issues: [问题反馈](https://github.com/dunxuan/claude-code/issues)
- 提交代码: Pull Request

## 许可证

贡献的代码遵循项目 MIT 许可证。

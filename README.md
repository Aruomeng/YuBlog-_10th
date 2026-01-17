# YuBlog - 第十代个人博客 🚀

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**一个融合了 AI、现代设计和前沿技术的个人博客系统。**

[在线演示](#) · [功能特性](#功能特性) · [快速开始](#快速开始) · [技术栈](#技术栈)

</div>

---

## ✨ 功能特性

### 🎨 前台展示
- **Bento Grid 布局** - 现代化的网格卡片布局设计
- **流动渐变动画** - 精美的文字流光效果
- **自定义光标特效** - 点击涟漪粒子动画
- **全局音乐播放器** - 跨页面持续播放，支持播放列表
- **响应式设计** - 完美适配移动端和桌面端
- **暗色主题** - 优雅的深色模式设计

### 📝 内容管理
- **文章管理** - Markdown 编辑器, 标签分类, 草稿/发布状态
- **项目展示** - 项目作品集管理
- **技能管理** - 技术栈可视化展示
- **时间线** - 个人经历时间轴
- **留言墙** - 访客互动留言

### 🔐 后台管理
- **OAuth 登录** - GitHub/Google 第三方登录
- **仪表盘** - 数据统计概览
- **沉浸模式** - 专注写作的沉浸式编辑体验
- **可折叠侧边栏** - 灵活的界面布局
- **骨架屏加载** - 优雅的加载状态

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 15 (App Router) |
| **前端** | React 19, TypeScript 5.7 |
| **样式** | Tailwind CSS 3.4, Framer Motion |
| **数据库** | PostgreSQL (Neon Serverless) |
| **ORM** | Drizzle ORM |
| **认证** | NextAuth.js v5 |
| **邮件** | Resend + React Email |
| **部署** | Vercel |

---

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm / npm / yarn
- PostgreSQL 数据库 (推荐 [Neon](https://neon.tech))

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/yourusername/yublog-10th.git
cd yublog-10th

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local

# 4. 初始化数据库
npx drizzle-kit push

# 5. 启动开发服务器
npm run dev
```

### 环境变量

```env
# 数据库
DATABASE_URL=postgresql://...

# NextAuth
AUTH_SECRET=your-secret-key
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

# 邮件服务 (可选)
RESEND_API_KEY=your-resend-api-key
```

---

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── (public)/          # 前台公开页面
│   ├── admin/             # 后台管理页面
│   ├── api/               # API 路由
│   └── login/             # 登录页面
├── components/            # React 组件
│   ├── admin/             # 后台组件
│   ├── bento/             # Bento Grid 组件
│   ├── effects/           # 特效组件
│   ├── layout/            # 布局组件
│   ├── ui/                # UI 基础组件
│   └── widgets/           # 首页小部件
├── db/                    # 数据库相关
│   ├── schema.ts          # Drizzle 表结构
│   └── index.ts           # 数据库连接
├── actions/               # Server Actions
├── lib/                   # 工具函数
└── emails/                # 邮件模板
```

---

## 📸 截图预览

### 首页
- 现代化 Bento Grid 布局
- 流动渐变标题动画
- 全局音乐播放器

### 后台管理
- 可折叠侧边栏
- 沉浸式编辑模式
- 骨架屏加载优化

---

## 🔧 开发命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 代码检查
```

### 数据库操作

```bash
npx drizzle-kit push      # 推送表结构到数据库
npx drizzle-kit studio    # 打开 Drizzle Studio
npx drizzle-kit generate  # 生成迁移文件
```

---

## 📄 License

[MIT](LICENSE) © Yu

---

<div align="center">

**用 ❤️ 和 ☕ 构建**

如果这个项目对你有帮助，请给一个 ⭐ 支持！

</div>

# YuBlog 配置指南

本文档列出了所有需要您手动配置的内容。

## 1. 数据库配置 (必需)

### 选项 A: 使用 Neon (推荐)

1. 访问 [Neon](https://neon.tech/) 并注册账号
2. 创建一个新项目
3. 复制连接字符串到 `.env.local`:

```bash
DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

### 选项 B: 使用 Supabase

1. 访问 [Supabase](https://supabase.com/) 并注册账号
2. 创建一个新项目
3. 进入 Settings > Database > Connection string
4. 复制连接字符串到 `.env.local`

### 推送数据库表结构

配置完 DATABASE_URL 后，运行:

```bash
npx drizzle-kit push
```

---

## 2. 身份验证配置 (必需 - 留言墙功能)

### Auth.js Secret

生成随机密钥:
```bash
openssl rand -base64 32
```

添加到 `.env.local`:
```bash
AUTH_SECRET="生成的随机密钥"
```

### GitHub OAuth

1. 访问 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写:
   - Application name: `YuBlog`
   - Homepage URL: `http://localhost:3000` (开发) 或你的域名
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. 复制 Client ID 和 Client Secret 到 `.env.local`:

```bash
AUTH_GITHUB_ID="你的 Client ID"
AUTH_GITHUB_SECRET="你的 Client Secret"
```

### Google OAuth (可选)

1. 访问 https://console.cloud.google.com/
2. 创建项目 > APIs & Services > Credentials
3. 创建 OAuth 2.0 Client ID (Web application)
4. 添加授权重定向 URI: `http://localhost:3000/api/auth/callback/google`
5. 复制 Client ID 和 Client Secret 到 `.env.local`:

```bash
AUTH_GOOGLE_ID="你的 Client ID"
AUTH_GOOGLE_SECRET="你的 Client Secret"
```

---

## 3. 邮件服务配置 (可选 - Newsletter 功能)

### Resend

1. 访问 https://resend.com/ 并注册
2. 创建 API Key
3. 配置发送域名 (或使用测试域名)
4. 添加到 `.env.local`:

```bash
RESEND_API_KEY="re_xxxxx"
```

然后修改 `src/actions/newsletter.ts` 中的发件人地址:
```typescript
from: "YuBlog <hello@你的域名.com>",
```

---

## 4. 站点 URL (部署时必需)

开发环境:
```bash
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

生产环境:
```bash
NEXT_PUBLIC_SITE_URL="https://你的域名.com"
```

---

## 5. 个人信息定制

### 更新个人资料

编辑以下文件中的个人信息:

- `src/components/widgets/about-widget.tsx` - 首页关于我
- `src/components/widgets/github-widget.tsx` - GitHub 用户名
- `src/app/about/page.tsx` - 关于页面详细信息
- `src/emails/welcome.tsx` - 欢迎邮件内容

### 更新导航链接

编辑 `src/components/layout/header.tsx` 中的导航项和联系按钮。

### 添加博客文章

目前文章是硬编码的。要添加真实文章:

1. 编辑 `src/app/blog/[slug]/page.tsx` 中的 `posts` 对象
2. 编辑 `src/app/blog/page.tsx` 中的 `posts` 数组
3. (后续) 集成 MDX 实现真正的内容管理

---

## 完整的 .env.local 示例

```bash
# 数据库 (必需)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Auth.js (留言墙必需)
AUTH_SECRET="your-32-character-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Resend (Newsletter 可选)
RESEND_API_KEY="re_xxxxx"

# 站点 URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 启动顺序

1. 复制 `.env.example` 到 `.env.local`
2. 填写上述配置
3. 运行 `npm install`
4. 运行 `npx drizzle-kit push` (推送数据库表)
5. 运行 `npm run dev` 启动开发服务器

---

## 常见问题

### 数据库连接失败
- 检查 DATABASE_URL 格式是否正确
- 确保包含 `?sslmode=require`
- 检查防火墙/网络设置

### OAuth 登录失败
- 检查回调 URL 是否正确配置
- 确保 Client ID 和 Secret 没有多余空格

### 邮件发送失败
- 检查 Resend API Key 是否有效
- 确保发件人域名已验证

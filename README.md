<!--
 * @Description: 
 * Ray版权所有
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved. 
-->
# 型识 SHAPE SENSE

> AI Neural Styling Lab - 智能发型探索应用

型识是一款基于AI技术的智能发型推荐应用，帮助用户在理发前预览发型效果，告别理发焦虑。通过AR技术实时试戴发型，让每一次发型选择都充满信心。

## 核心功能

### 1. AI智能分析
- 拍照分析脸型特征
- 基于AI算法推荐最适合的发型
- 智能匹配肤色与发色

### 2. AR实时试戴
- 虚拟试戴各种发型
- 实时预览染发效果
- 所见即所得的体验

### 3. 发型收藏
- 收藏喜欢的发型
- 查看历史分析记录
- 一键分享到社交平台

## 页面结构

| 页面 | 文件 | 说明 |
|------|------|------|
| 启动页 | `SplashScreen.tsx` | 应用启动时的品牌展示页，显示Logo和应用名称 |
| 登录页 | `page.tsx` | 微信快速登录入口，展示应用特色功能 |
| 加载页 | `LoadingScreen.tsx` | 登录后的过渡动画，同心圆脉冲效果 |
| 引导页 | `OnboardingScreen.tsx` | 新用户功能介绍，3个轮播卡片展示核心功能 |
| 主页 | `Home.tsx` | 主功能入口（开发中） |
| 效果页 | `Effects.tsx` | 发型效果展示页面（开发中） |
| 沙龙页 | `Salon.tsx` | 发型沙龙推荐页面（开发中） |
| 我的页面 | `Profile.tsx` | 用户个人中心页面 |

## 状态管理

使用 Zustand 进行状态管理，包含三个核心 Store：

| Store | 文件 | 说明 |
|-------|------|------|
| 用户状态 | `userStore.ts` | 管理登录状态、用户信息、Token |
| 应用状态 | `appStore.ts` | 管理当前页面、加载状态、首次启动 |
| 发型状态 | `hairstyleStore.ts` | 管理收藏发型、历史记录、AI分析结果 |

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Next.js 16 (Turbopack)
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **图标**: Lucide React
- **主题**: next-themes
- **持久化**: localStorage (通过 zustand/middleware/persist)
- **UI组件**: shadcn/ui

## 安装依赖

```bash
npm install zustand lucide-react next-themes
```

## 目录结构

```
ShapeSense/
├── src/                      # 源代码目录
│   ├── screens/              # 页面组件
│   │   ├── Home.tsx        # 首页
│   │   ├── Effects.tsx      # 效果页
│   │   ├── Salon.tsx        # 沙龙页
│   │   └── Profile.tsx      # 我的页面
│   ├── components/           # 组件目录
│   │   ├── common/          # 通用组件
│   │   │   ├── BottomNav.tsx       # 底部导航栏
│   │   │   ├── ConfirmDialog.tsx   # 确认对话框
│   │   │   ├── SuccessDialog.tsx   # 成功提示对话框
│   │   │   └── ThemeProvider.tsx   # 主题提供者
│   │   └── business/        # 业务组件
│   │       ├── LoadingScreen.tsx    # 加载页
│   │       ├── OnboardingScreen.tsx # 引导页
│   │       └── SplashScreen.tsx    # 启动页
│   ├── styles/             # 样式文件
│   │   ├── bottom-nav.css
│   │   ├── confirm-dialog.css
│   │   ├── success-dialog.css
│   │   ├── home.css
│   │   ├── effects.css
│   │   ├── salon.css
│   │   ├── profile.css
│   │   ├── onboarding.module.css
│   │   └── styles.module.css
│   └── types/              # 类型声明
│       └── css.d.ts
├── app/                    # Next.js App Router
│   ├── globals.css         # 全局样式（Tailwind CSS 配置）
│   ├── layout.tsx          # 根布局组件
│   └── page.tsx            # 主入口页面
├── components/              # UI 组件库
│   ├── ui/                # shadcn/ui 组件
│   └── theme-provider.tsx  # 主题提供者
├── hooks/                  # 自定义 Hooks
│   ├── use-mobile.ts       # 移动端检测
│   └── use-toast.ts       # Toast 提示
├── lib/                    # 工具和状态管理
│   ├── stores/
│   │   ├── appStore.ts
│   │   ├── userStore.ts
│   │   ├── hairstyleStore.ts
│   │   └── index.ts
│   └── utils.ts
├── public/                 # 静态资源
│   └── images/            # 图片资源
├── types/                 # 类型声明
│   └── css.d.ts
├── .gitignore
├── next.config.mjs
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── README.md
```

## 页面流程

```
启动页 (SplashScreen)
    ↓ 2.5秒自动跳转或点击跳过
登录页 (Login)
    ↓ 点击微信快速登录
加载页 (LoadingScreen)
    ↓ 进度完成后
引导页 (OnboardingScreen)
    ↓ 点击立即体验或跳过
主页 (Home)
    ↓ 底部导航切换
效果页 / 沙龙页 / 我的页面
```

## 设计规范

### 颜色系统
- 主色: `#9333ea` (紫色)
- 背景: `#0a0a0a` (深紫黑)
- 强调色: `#5eead4` (青绿色)
- 成功色: `#4ade80` (绿色)

### 组件特性
- 毛玻璃效果: `backdrop-blur-md`
- 渐变边框: `bg-gradient-to-br`
- 图片悬停放大: `group-hover:scale-110`
- 平滑过渡: `transition-all duration-300`

## 开发指南

### 环境配置

#### 环境变量
创建 `.env.local` 文件配置本地环境变量：

```env
# API 配置
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=your_api_key_here

# 微信登录配置
NEXT_PUBLIC_WECHAT_APP_ID=your_app_id
NEXT_PUBLIC_WECHAT_REDIRECT_URI=http://localhost:3000/auth/callback
```

#### 开发环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0
- 现代浏览器（Chrome、Firefox、Safari、Edge）

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 组件使用 PascalCase 命名
- 样式文件使用 kebab-case 命名
- 所有文件包含规范的文件头注释

## 部署

### Vercel 部署

```bash
npm run build
vercel --prod
```

### 其他平台

- **Netlify**: 支持自动部署
- **Docker**: 提供了 Dockerfile

## 联系方式

- **作者**: Ray
- **邮箱**: 1194494392@qq.com
- **GitHub**: https://github.com/GuiYuanLu/ShapeSense2
- **问题反馈**: [GitHub Issues](https://github.com/GuiYuanLu/ShapeSense2/issues)

## 许可证

Copyright (c) 2026 by Ray, All Rights Reserved.

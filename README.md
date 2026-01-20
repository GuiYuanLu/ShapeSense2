

# 型识 SHAPE SENSE

> AI Neural Styling Lab - 智能发型探索应用

## 项目简介

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

## 状态管理

使用 Zustand 进行状态管理，包含三个核心 Store：

| Store | 文件 | 说明 |
|-------|------|------|
| 用户状态 | `userStore.ts` | 管理登录状态、用户信息、Token |
| 应用状态 | `appStore.ts` | 管理当前页面、加载状态、首次启动 |
| 发型状态 | `hairstyleStore.ts` | 管理收藏发型、历史记录、AI分析结果 |

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **图标**: Lucide React
- **持久化**: localStorage (通过 zustand/middleware/persist)

## 安装依赖

```bash
npm install zustand lucide-react
```

## 目录结构

```
src/
├── components/           # 组件目录
│   ├── SplashScreen.tsx    # 启动页组件
│   ├── LoadingScreen.tsx   # 加载页组件
│   └── OnboardingScreen.tsx # 引导页组件
├── pages/               # 页面目录
│   ├── Login.tsx          # 登录页
│   └── Home.tsx           # 主页
├── stores/              # 状态管理目录
│   ├── userStore.ts       # 用户状态
│   ├── appStore.ts        # 应用状态
│   ├── hairstyleStore.ts  # 发型状态
│   └── index.ts           # 统一导出
├── assets/              # 静态资源目录
└── App.tsx              # 应用入口
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
```

## 设计规范

### 颜色系统
- 主色: `#7c3aed` (紫色)
- 背景: `#1a1025` (深紫黑)
- 强调色: `#5eead4` (青绿色)
- 成功色: `#4ade80` (绿色)

### 组件特性
- 毛玻璃效果: `backdrop-blur-md`
- 渐变边框: `bg-gradient-to-br`
- 图片悬停放大: `group-hover:scale-110`
- 平滑过渡: `transition-all duration-300`

## 作者

Ray - 型识项目开发者

## 许可证

Copyright (c) 2025 by Ray, All Rights Reserved.

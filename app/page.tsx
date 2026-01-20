/*
 * @Description: 主入口页面 - 整合启动页、登录页、加载页、引导页的路由控制
 * Ray版权所有
 * Copyright (c) 2025 by Ray, All Rights Reserved.
 * 编辑时间: 2025-01-20 12:00:00
 */

"use client"

import { useState } from "react"
import { Shield, Camera, Sparkles, Moon, Sun } from "lucide-react"
import { LoadingScreen } from "@/components/LoadingScreen"
import { OnboardingScreen } from "@/components/OnboardingScreen"
import { SplashScreen } from "@/components/SplashScreen"
import { useAppStore, useUserStore } from "@/lib/stores"
import styles from "./styles.module.css"

/*
 * LoginPage - 登录页面主组件
 * 根据 currentScreen 状态渲染不同的页面
 * 页面流程: 启动页 -> 登录页 -> 加载页 -> 引导页 -> 主页
 */
export default function LoginPage() {
  /* 从状态管理获取当前屏幕和屏幕切换方法 */
  const { currentScreen, setScreen } = useAppStore()
  /* 从用户状态管理获取登录方法 */
  const { login } = useUserStore()
  /* 主题状态：dark 或 light */
  const [isDarkMode, setIsDarkMode] = useState(true)

  /*
   * handleWeChatLogin - 处理微信登录点击
   * 切换到加载页面
   */
  const handleWeChatLogin = () => {
    setScreen("loading")
  }

  /*
   * handleLoginComplete - 处理登录完成
   * 创建模拟用户数据并切换到引导页
   */
  const handleLoginComplete = () => {
    login(
      {
        id: "user_" + Date.now(),
        nickname: "型识用户",
        avatar: "",
        createdAt: new Date().toISOString(),
      },
      "mock_token_" + Date.now()
    )
    setScreen("onboarding")
  }

  /*
   * toggleTheme - 切换明暗主题
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  /* 主题切换按钮组件 */
  const ThemeToggle = () => (
    <button className={styles.themeToggle} onClick={toggleTheme} aria-label="切换主题">
      {isDarkMode ? (
        <Sun className={styles.iconMd} />
      ) : (
        <Moon className={styles.iconMd} />
      )}
    </button>
  )

  if (currentScreen === "splash") {
    return <SplashScreen onComplete={() => setScreen("login")} />
  }

  if (currentScreen === "loading") {
    return <LoadingScreen onComplete={handleLoginComplete} />
  }

  if (currentScreen === "onboarding") {
    return (
      <OnboardingScreen
        onBack={() => setScreen("login")}
        onStart={() => setScreen("home")}
        onSkip={() => setScreen("home")}
      />
    )
  }

  if (currentScreen === "home") {
    return (
      <div className={styles.homeContainer}>
        <ThemeToggle />
        <div className={styles.homeContent}>
          <h1 className={styles.homeTitle}>欢迎来到型识</h1>
          <p className={styles.homeSubtitle}>主页面开发中...</p>
          <button
            onClick={() => {
              useUserStore.getState().logout()
              setScreen("login")
            }}
            className={styles.homeLogoutBtn}
          >
            退出登录
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.loginContainer}>
      <ThemeToggle />
      
      {/* Background images */}
      <div className={styles.loginBgImages}>
        <div className={styles.loginBgImage} style={{ top: 0, left: 0, width: '8rem', height: '10rem' }}>
          <img src="/images/e7-99-bb-e5-bd-95-e9-a1-b5.png" alt="" className={styles.loginBgImageBlur} />
        </div>
        <div className={styles.loginBgImage} style={{ top: '5rem', right: 0, width: '7rem', height: '9rem' }}>
          <img src="/images/e7-99-bb-e5-bd-95-e9-a1-b5.png" alt="" className={styles.loginBgImageBlur} />
        </div>
        <div className={styles.loginBgImage} style={{ top: 0, left: '33%', width: '6rem', height: '8rem', opacity: 0.2 }}>
          <img src="/images/e7-99-bb-e5-bd-95-e9-a1-b5.png" alt="" className={styles.loginBgImageBlur} />
        </div>
      </div>

      {/* Main content */}
      <div className={styles.loginContent}>
        {/* Avatar with gradient ring */}
        <div className={styles.loginAvatar}>
          <div className={styles.loginAvatarRing}>
            <div className={styles.loginAvatarInner}>
              <div className={styles.loginAvatarCircle}></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className={styles.loginTitle}>#型识#</h1>
        <p className={styles.loginSubtitle}>探索你的数字发型</p>
        <p className={styles.loginTagline}>让AI预见最美的你</p>

        {/* Login card */}
        <div className={styles.loginCard}>
          <h2 className={styles.loginCardTitle}>开启发型探索之旅</h2>

          {/* WeChat login button */}
          <button onClick={handleWeChatLogin} className={styles.loginWechatBtn}>
            微信快速登录
          </button>

          {/* Info box */}
          <div className={styles.loginInfoBox}>
            <p className={styles.loginInfoText}>
              当前为预览模式，您可自动登录。应用正式发布后，需要使用真实信息进行登录。
              <span className={styles.loginInfoIcon}>?</span>
            </p>
          </div>

          {/* Security notice */}
          <div className={styles.loginSecurity}>
            <Shield className={styles.iconSm} />
            <span>安全登录，保护隐私</span>
          </div>

          {/* Terms */}
          <p className={styles.loginTerms}>
            登录即代表同意{" "}
            <span className={styles.loginTermsLink}>《用户协议》</span> 与{" "}
            <span className={styles.loginTermsLink}>《隐私政策》</span>
          </p>
        </div>

        {/* Feature tabs */}
        <div className={styles.loginFeatureTabs}>
          <span>AI发型推荐</span>
          <span>·</span>
          <span>AR头发试戴</span>
        </div>

        {/* Feature cards */}
        <div className={styles.loginFeatureCards}>
          <div className={styles.loginFeatureCard}>
            <div className={styles.loginFeatureCardHeader}>
              <div className={styles.loginFeatureCardIcon}>
                <Camera className={`${styles.iconSm} ${styles.iconPurple}`} />
              </div>
              <span className={styles.loginFeatureCardTitle}>AI智能分析</span>
            </div>
            <p className={styles.loginFeatureCardDesc}>拍照分析脸型，推荐专属发型</p>
          </div>

          <div className={styles.loginFeatureCard}>
            <div className={styles.loginFeatureCardHeader}>
              <div className={styles.loginFeatureCardIcon}>
                <Sparkles className={`${styles.iconSm} ${styles.iconPurple}`} />
              </div>
              <span className={styles.loginFeatureCardTitle}>AR实时试戴</span>
            </div>
            <p className={styles.loginFeatureCardDesc}>虚拟试戴发型发色，所见即所得</p>
          </div>
        </div>

        {/* Footer text */}
        <p className={styles.loginFooter}>
          &quot;每个发型都是一次自我表达，让科技帮你找到最适合的那一款&quot;
        </p>
      </div>
    </div>
  )
}

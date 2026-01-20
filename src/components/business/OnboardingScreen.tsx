/*
 * @Description: 引导页组件 - 新用户功能介绍轮播页面
 * 展示应用的核心功能和使用流程，帮助新用户快速了解产品
 * 功能：展示三个引导幻灯片，支持主题切换，可跳过引导
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */

"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Camera, Star, HelpCircle, Sparkles, X, Palette, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import styles from "@/styles/onboarding.module.css"

interface OnboardingScreenProps {
  onBack?: () => void
  onStart?: () => void
  onSkip?: () => void
}

/*
 * OnboardingScreen - 引导页组件
 */
export function OnboardingScreen({ onBack, onStart, onSkip }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const ThemeToggle = () => (
    <button className={styles.themeToggle} onClick={toggleTheme} aria-label="切换主题">
      {!mounted ? (
        <Sun className={styles.iconMd} />
      ) : theme === "dark" ? (
        <Sun className={styles.iconMd} />
      ) : (
        <Moon className={styles.iconMd} />
      )}
    </button>
  )

  const slides = [
    {
      icon: <HelpCircle className={`${styles.iconMd} ${styles.iconPurple}`} />,
      title: "告别理发焦虑",
      content: (
        <div className={styles.slideContent}>
          <div className={styles.problemBox}>
            <p className={styles.problemTitle}>传统困扰</p>
            <div className={styles.problemList}>
              <div className={styles.problemItem}>
                <X className={`${styles.iconSm} ${styles.iconRed}`} />
                <span>效果未知，忐忑不安</span>
              </div>
              <div className={styles.problemItem}>
                <X className={`${styles.iconSm} ${styles.iconRed}`} />
                <span>发型不合适，后悔莫及</span>
              </div>
            </div>
          </div>
          <div className={styles.imageCard}>
            <img src="/images/anxious-sheep.jpg" alt="焦虑" className={styles.imageCardImg} style={{ height: '10rem' }} />
            <div className={styles.imageCardLabel}>
              <span className={`${styles.imageCardTag} ${styles.tagPurple}`}>焦虑</span>
            </div>
          </div>
        </div>
      ),
      bottomTitle: "告别想象，拥抱真实",
      bottomDesc: "通过AR技术，在理发前就能看到最终效果，避免后悔",
    },
    {
      icon: <Sparkles className={`${styles.iconMd} ${styles.iconPurple}`} />,
      title: "探索无限可能",
      content: (
        <div className={styles.grid2}>
          {[
            { src: "/images/dream-wave.jpg", label: "梦幻波浪" },
            { src: "/images/elegant-short.jpg", label: "优雅短发" },
            { src: "/images/active-ponytail.jpg", label: "活力马尾" },
            { src: "/images/anime-bangs.jpg", label: "二次元刘海" },
          ].map((item, index) => (
            <div key={index} className={styles.imageCard}>
              <img src={item.src || "/placeholder.svg"} alt={item.label} className={styles.imageCardImg} style={{ height: '7rem' }} />
              <div className={styles.imageCardLabel}>
                <span className={`${styles.imageCardTag} ${styles.tagPurple}`}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      ),
      bottomTitle: "开启你的发型探索之旅",
      bottomDesc: "AI智能分析你的脸型与风格，推荐最适合的发型",
    },
    {
      icon: <Palette className={`${styles.iconMd} ${styles.iconPurple}`} />,
      title: "智能造型工坊",
      content: (
        <div className={styles.slideContent}>
          <div className={styles.grid2}>
            {[
              { src: "/images/ai-scan.jpg", label: "AI面部分析" },
              { src: "/images/virtual-mirror.jpg", label: "虚拟试妆" },
            ].map((item, index) => (
              <div key={index} className={styles.imageCard}>
                <img src={item.src || "/placeholder.svg"} alt={item.label} className={styles.imageCardImg} style={{ height: '6rem' }} />
                <div className={styles.imageCardLabel}>
                  <span className={`${styles.imageCardTag} ${styles.tagCyan}`}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.imageCard}>
            <img src="/images/hair-colors.jpg" alt="染发调色" className={styles.imageCardImg} style={{ height: '8rem' }} />
            <div className={styles.imageCardLabel}>
              <span className={`${styles.imageCardTag} ${styles.tagGradient}`}>百变发色</span>
            </div>
            <div className={styles.imageCardBadge}>新功能</div>
          </div>
        </div>
      ),
      bottomTitle: "打造专属你的完美造型",
      bottomDesc: "从脸型分析到发色搭配，一站式智能造型解决方案",
    },
  ]

  return (
    <div className={styles.container}>
      <ThemeToggle />
      <div className={styles.bgBlur}>
        <div className={styles.blurCircle} style={{ top: '2.5rem', right: '2.5rem', width: '8rem', height: '8rem', backgroundColor: 'rgba(147, 51, 234, 0.2)' }} />
        <div className={styles.blurCircle} style={{ bottom: '10rem', left: '2.5rem', width: '10rem', height: '10rem', backgroundColor: 'rgba(107, 33, 168, 0.2)' }} />
      </div>

      <div className={styles.content}>
        <button onClick={onBack} className={styles.backBtn}>
          <ChevronLeft className={styles.iconLg} />
        </button>

        <div className={styles.header}>
          <div className={styles.logo}>
            <Star className={`${styles.iconLg} ${styles.iconWhite}`} style={{ fill: 'var(--foreground)' }} />
          </div>
          <h1 className={styles.title}>型识</h1>
        </div>
        <p className={styles.subtitle}>探索你的数字发型梦境</p>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            {slides[currentSlide].icon}
            <h2 className={styles.cardTitle}>{slides[currentSlide].title}</h2>
          </div>
          {slides[currentSlide].content}
        </div>

        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : styles.dotInactive}`}
            />
          ))}
        </div>

        <div className={styles.bottomSection}>
          <h3 className={styles.bottomTitle}>{slides[currentSlide].bottomTitle}</h3>
          <p className={styles.bottomDesc}>{slides[currentSlide].bottomDesc}</p>
        </div>

        <div className={styles.spacer} />

        <button onClick={onStart} className={styles.ctaBtn}>
          <Camera className={styles.iconMd} />
          立即体验
        </button>

        <button onClick={onSkip} className={styles.skipBtn}>
          跳过引导，直接进入
        </button>
      </div>
    </div>
  )
}

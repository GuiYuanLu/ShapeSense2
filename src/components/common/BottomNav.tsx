/*
 * @Description: 底部导航栏组件 - 应用主导航
 * 用于在首页、效果、沙龙、我的四个页面之间切换
 * 功能：显示四个导航按钮，支持高亮当前页面，响应式布局
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */
"use client"

import { Home, Sparkles, Scissors, User } from "lucide-react"
import styles from "@/styles/bottom-nav.css"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "首页" },
    { id: "effects", icon: Sparkles, label: "效果" },
    { id: "salon", icon: Scissors, label: "沙龙" },
    { id: "profile", icon: User, label: "我的" },
  ]

  return (
    <nav className={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : styles.tabInactive}`}
          aria-label={tab.label}
        >
          <tab.icon className={styles.icon} />
          <span className={styles.label}>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

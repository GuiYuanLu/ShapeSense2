/*
 * @Description: 
 * Ray版权所有
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved. 
 */
/*
 * @Description: 用户个人中心页面 - 我的页面
 * 展示用户个人信息、设置和功能入口
 * 功能：显示用户头像和昵称、设置选项、收藏历史、退出登录
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */
"use client"

import { useState } from "react"
import { User, Settings, Heart, History, LogOut } from "lucide-react"
import { useAppStore, useUserStore } from "@/lib/stores"
import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { SuccessDialog } from "@/components/common/SuccessDialog"
import styles from "@/styles/profile.module.css"

export function ProfileScreen() {
  const { setScreen } = useAppStore()
  const { logout } = useUserStore()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleLogout = () => {
    logout()
    setShowLogoutDialog(false)
    setShowSuccessDialog(true)
    
    setTimeout(() => {
      setShowSuccessDialog(false)
      setScreen("login")
    }, 2000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <User className={styles.avatarIcon} />
        </div>
        <h1 className={styles.title}>我的</h1>
      </div>

      <div className={styles.menu}>
        <button className={styles.menuItem}>
          <Heart className={styles.menuIcon} />
          <span className={styles.menuLabel}>我的收藏</span>
        </button>
        <button className={styles.menuItem}>
          <History className={styles.menuIcon} />
          <span className={styles.menuLabel}>历史记录</span>
        </button>
        <button className={styles.menuItem}>
          <Settings className={styles.menuIcon} />
          <span className={styles.menuLabel}>设置</span>
        </button>
      </div>

      <button 
        onClick={() => setShowLogoutDialog(true)}
        className={styles.logoutButton}
      >
        <LogOut className={styles.logoutIcon} />
        <span className={styles.logoutLabel}>退出登录</span>
      </button>

      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="退出登录"
        message="退出当前账号会清除所有数据，确定要退出吗？"
        confirmText="确认退出"
        cancelText="取消"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
        type="warning"
      />

      <SuccessDialog
        isOpen={showSuccessDialog}
        title="退出成功"
        message="已安全退出当前账号"
        onClose={() => setShowSuccessDialog(false)}
      />
    </div>
  )
}

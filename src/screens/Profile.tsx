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
  const { logout, user } = useUserStore()
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

  // 模拟用户数据 - 如果user为null时显示
  // 按照国内大厂数据结构设计
  const mockUser = {
    // 基础身份信息
    id: "user_1234567890",
    nickname: "型识用户",
    username: "shapesense_123",
    avatar: "",
    phone: "138****8888",
    email: "user@example.com",
    
    // 个人资料
    gender: "female" as const,
    birthday: "1990-01-01",
    region: "上海市浦东新区",
    bio: "热爱时尚，喜欢尝试各种发型",
    faceShape: "瓜子脸",
    
    // 社交数据
    followers: 128,
    following: 56,
    
    // 行为数据
    points: 1580,
    level: 3,
    
    // 时间戳
    createdAt: "2026-01-01T10:00:00Z",
    updatedAt: "2026-01-20T14:30:00Z",
    lastLoginAt: "2026-01-21T09:15:00Z",
    
    // 状态信息
    status: "active" as const,
    
    // 扩展信息
    extInfo: {
      preferredHairstyles: ["齐肩短发", "空气刘海"],
      preferredColors: ["#9333ea", "#3b82f6"]
    }
  }

  const displayUser = user || mockUser
  const formattedDate = new Date(displayUser.createdAt).toLocaleDateString('zh-CN')

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <User className={styles.avatarIcon} />
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.title}>{displayUser.nickname}</h1>
          <p className={styles.userId}>ID: {displayUser.id.substring(0, 8)}...</p>
        </div>
      </div>

      {/* 用户详情卡片 */}
      <div className={styles.userDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>用户名</span>
          <span className={styles.detailValue}>{displayUser.username}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>手机号</span>
          <span className={styles.detailValue}>{displayUser.phone}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>邮箱</span>
          <span className={styles.detailValue}>{displayUser.email}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>性别</span>
          <span className={styles.detailValue}>
            {displayUser.gender === 'male' ? '男' : displayUser.gender === 'female' ? '女' : '其他'}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>生日</span>
          <span className={styles.detailValue}>{displayUser.birthday || '未设置'}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>地区</span>
          <span className={styles.detailValue}>{displayUser.region || '未设置'}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>脸型</span>
          <span className={styles.detailValue}>{displayUser.faceShape || '未分析'}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>等级</span>
          <span className={styles.detailValue}>LV.{displayUser.level}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>积分</span>
          <span className={styles.detailValue}>{displayUser.points}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>注册时间</span>
          <span className={styles.detailValue}>{new Date(displayUser.createdAt).toLocaleDateString('zh-CN')}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>最后登录</span>
          <span className={styles.detailValue}>{new Date(displayUser.lastLoginAt).toLocaleString('zh-CN')}</span>
        </div>
      </div>
      
      {/* 社交信息 */}
      <div className={styles.socialInfo}>
        <div className={styles.socialItem}>
          <div className={styles.socialValue}>{displayUser.followers}</div>
          <div className={styles.socialLabel}>粉丝</div>
        </div>
        <div className={styles.socialDivider}></div>
        <div className={styles.socialItem}>
          <div className={styles.socialValue}>{displayUser.following}</div>
          <div className={styles.socialLabel}>关注</div>
        </div>
        <div className={styles.socialDivider}></div>
        <div className={styles.socialItem}>
          <div className={styles.socialValue}>{displayUser.extInfo?.preferredHairstyles?.length || 0}</div>
          <div className={styles.socialLabel}>偏好发型</div>
        </div>
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

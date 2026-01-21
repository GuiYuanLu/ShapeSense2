/*
 * @Description: 用户状态管理 - 管理用户登录状态、用户信息、Token等
 * Ray版权所有
 * Copyright (c) 2025 by Ray, All Rights Reserved.
 * 编辑时间: 2025-01-20 12:00:00
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/*
 * UserInfo - 用户信息类型
 * 按照国内大厂数据结构设计，包含用户基础信息、社交信息、行为数据等
 * @property id - 用户唯一标识
 * @property nickname - 用户昵称
 * @property username - 用户名（登录用）
 * @property avatar - 用户头像URL
 * @property phone - 用户手机号
 * @property email - 用户邮箱
 * @property gender - 用户性别
 * @property birthday - 用户生日
 * @property region - 用户地区
 * @property bio - 个性签名
 * @property faceShape - AI脸型分析结果
 * @property followers - 粉丝数
 * @property following - 关注数
 * @property points - 积分
 * @property level - 用户等级
 * @property createdAt - 账号创建时间
 * @property updatedAt - 信息更新时间
 * @property lastLoginAt - 最后登录时间
 * @property status - 用户状态
 * @property extInfo - 扩展信息
 */
export interface UserInfo {
  // 基础身份信息
  id: string
  nickname: string
  username: string
  avatar: string
  phone?: string
  email?: string
  
  // 个人资料
  gender?: 'male' | 'female' | 'other'
  birthday?: string
  region?: string
  bio?: string
  faceShape?: string // AI脸型分析结果
  
  // 社交数据
  followers?: number
  following?: number
  
  // 行为数据
  points?: number
  level?: number
  
  // 时间戳
  createdAt: string
  updatedAt: string
  lastLoginAt: string
  
  // 状态信息
  status?: 'active' | 'inactive' | 'banned'
  
  // 扩展信息
  extInfo?: Record<string, any>
}

// 用户状态类型
interface UserState {
  // 状态
  isLoggedIn: boolean
  user: UserInfo | null
  token: string | null
  
  // 操作
  login: (user: UserInfo, token: string) => void
  logout: () => void
  updateUser: (data: Partial<UserInfo>) => void
  setFaceShape: (faceShape: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // 初始状态
      isLoggedIn: false,
      user: null,
      token: null,

      // 登录
      login: (user, token) =>
        set({
          isLoggedIn: true,
          user,
          token,
        }),

      // 登出
      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
          token: null,
        }),

      // 更新用户信息
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      // 设置脸型分析结果
      setFaceShape: (faceShape) =>
        set((state) => ({
          user: state.user ? { ...state.user, faceShape } : null,
        })),
    }),
    {
      name: 'user-storage', // localStorage 的 key
    }
  )
)

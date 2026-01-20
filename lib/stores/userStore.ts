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
 * @property id - 用户唯一标识
 * @property nickname - 用户昵称
 * @property avatar - 用户头像URL
 * @property phone - 用户手机号（可选）
 * @property gender - 用户性别（可选）
 * @property faceShape - AI脸型分析结果（可选）
 * @property createdAt - 账号创建时间
 */
export interface UserInfo {
  id: string
  nickname: string
  avatar: string
  phone?: string
  gender?: 'male' | 'female' | 'other'
  faceShape?: string // 脸型分析结果
  createdAt: string
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

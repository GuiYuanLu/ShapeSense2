/*
 * @Description: 应用状态管理 - 管理当前屏幕、加载状态、首次启动等
 * Ray版权所有
 * Copyright (c) 2025 by Ray, All Rights Reserved.
 * 编辑时间: 2025-01-20 12:00:00
 */

import { create } from 'zustand'

/*
 * ScreenType - 屏幕类型枚举
 * splash: 启动页 | login: 登录页 | loading: 加载页
 * onboarding: 引导页 | home: 主页 | camera: 相机页 | result: 结果页
 */
export type ScreenType = 'splash' | 'login' | 'loading' | 'onboarding' | 'home' | 'camera' | 'result'

// 应用状态类型
interface AppState {
  // 状态
  currentScreen: ScreenType
  isFirstLaunch: boolean
  isLoading: boolean
  
  // 操作
  setScreen: (screen: ScreenType) => void
  setFirstLaunch: (value: boolean) => void
  setLoading: (value: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  // 初始状态
  currentScreen: 'splash',
  isFirstLaunch: true,
  isLoading: false,

  // 设置当前屏幕
  setScreen: (screen) => set({ currentScreen: screen }),

  // 设置是否首次启动
  setFirstLaunch: (value) => set({ isFirstLaunch: value }),

  // 设置加载状态
  setLoading: (value) => set({ isLoading: value }),
}))

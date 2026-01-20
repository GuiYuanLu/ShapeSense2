/*
 * @Description: 发型状态管理 - 管理收藏发型、历史记录、AI分析结果等
 * Ray版权所有
 * Copyright (c) 2025 by Ray, All Rights Reserved.
 * 编辑时间: 2025-01-20 12:00:00
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/*
 * Hairstyle - 发型数据类型
 * @property id - 发型唯一标识
 * @property name - 发型名称
 * @property image - 发型图片URL
 * @property category - 发型分类
 * @property tags - 发型标签数组
 * @property popularity - 热度值
 */
export interface Hairstyle {
  id: string
  name: string
  image: string
  category: 'short' | 'medium' | 'long' | 'curly' | 'straight' | 'color'
  tags: string[]
  popularity: number
}

// AI分析结果类型
export interface AnalysisResult {
  id: string
  originalImage: string
  resultImage: string
  faceShape: string
  recommendations: Hairstyle[]
  createdAt: string
}

// 发型状态类型
interface HairstyleState {
  // 状态
  favorites: Hairstyle[]
  history: AnalysisResult[]
  currentAnalysis: AnalysisResult | null
  
  // 操作
  addFavorite: (hairstyle: Hairstyle) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  addToHistory: (result: AnalysisResult) => void
  clearHistory: () => void
  setCurrentAnalysis: (result: AnalysisResult | null) => void
}

export const useHairstyleStore = create<HairstyleState>()(
  persist(
    (set, get) => ({
      // 初始状态
      favorites: [],
      history: [],
      currentAnalysis: null,

      // 添加收藏
      addFavorite: (hairstyle) =>
        set((state) => ({
          favorites: [...state.favorites, hairstyle],
        })),

      // 移除收藏
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((h) => h.id !== id),
        })),

      // 检查是否已收藏
      isFavorite: (id) => get().favorites.some((h) => h.id === id),

      // 添加到历史记录
      addToHistory: (result) =>
        set((state) => ({
          history: [result, ...state.history].slice(0, 20), // 最多保留20条
        })),

      // 清空历史
      clearHistory: () => set({ history: [] }),

      // 设置当前分析结果
      setCurrentAnalysis: (result) => set({ currentAnalysis: result }),
    }),
    {
      name: 'hairstyle-storage',
    }
  )
)

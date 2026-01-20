/*
 * @Description: 状态管理统一导出入口
 * Ray版权所有
 * Copyright (c) 2025 by Ray, All Rights Reserved.
 * 编辑时间: 2025-01-20 12:00:00
 */

/* 导出所有 stores */
export { useUserStore } from './userStore'
export { useAppStore } from './appStore'
export { useHairstyleStore } from './hairstyleStore'

// 导出类型
export type { UserInfo } from './userStore'
export type { ScreenType } from './appStore'
export type { Hairstyle, AnalysisResult } from './hairstyleStore'

/*
 * @Description: 数据状态管理 - 管理发型列表、发色列表等静态数据
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */

import { create } from 'zustand'

// 发型数据类型
export interface Hairstyle {
  id: number;
  name: string;
}

// 发色数据类型
export interface Haircolor {
  id: number;
  name: string;
  color: string;
}

// 数据状态类型
interface DataState {
  // 状态
  hairstyles: Hairstyle[];
  haircolors: Haircolor[];
  
  // 操作
  getHairstyleById: (id: number) => Hairstyle | undefined;
  getHaircolorById: (id: number) => Haircolor | undefined;
  getAllHairstyles: () => Hairstyle[];
  getAllHaircolors: () => Haircolor[];
}

// 发型列表数据
const hairstylesData: Hairstyle[] = [
  { id: 1, name: "齐肩短发" },
  { id: 2, name: "层次长发" },
  { id: 3, name: "空气刘海" },
  { id: 4, name: "波浪卷发" },
  { id: 5, name: "高马尾" },
  { id: 6, name: "低丸子头" },
  { id: 7, name: "法式刘海" },
  { id: 8, name: "纹理短发" },
  { id: 9, name: "编发辫" },
  { id: 10, name: "离子直发" },
  { id: 11, name: "微卷长发" },
  { id: 12, name: "齐刘海短发" },
  { id: 13, name: "公主切" },
  { id: 14, name: "羊毛卷" },
  { id: 15, name: "鲻鱼头" }
];

// 发色列表数据
const haircolorsData: Haircolor[] = [
  { id: 1, name: "梦境紫", color: "#9333ea" },
  { id: 2, name: "深海蓝", color: "#3b82f6" },
  { id: 3, name: "幻光粉", color: "#ec4899" },
  { id: 4, name: "星辰银", color: "#d1d5db" },
  { id: 5, name: "暮光金", color: "#f59e0b" },
  { id: 6, name: "珊瑚橙", color: "#f97316" },
  { id: 7, name: "薄荷绿", color: "#14b8a6" },
  { id: 8, name: "樱花粉", color: "#f9a8d4" },
  { id: 9, name: "雾霾蓝", color: "#93c5fd" },
  { id: 10, name: "焦糖棕", color: "#d97706" },
  { id: 11, name: "玫瑰金", color: "#f472b6" },
  { id: 12, name: "橄榄绿", color: "#84cc16" },
  { id: 13, name: "薰衣草", color: "#c4b5fd" },
  { id: 14, name: "琥珀色", color: "#f59e0b" },
  { id: 15, name: "宝石红", color: "#ef4444" }
];

export const useDataStore = create<DataState>((set, get) => ({
  // 初始状态
  hairstyles: hairstylesData,
  haircolors: haircolorsData,

  // 根据ID获取发型
  getHairstyleById: (id) => {
    return get().hairstyles.find(style => style.id === id);
  },

  // 根据ID获取发色
  getHaircolorById: (id) => {
    return get().haircolors.find(color => color.id === id);
  },

  // 获取所有发型
  getAllHairstyles: () => {
    return get().hairstyles;
  },

  // 获取所有发色
  getAllHaircolors: () => {
    return get().haircolors;
  },
}))

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 将RGB值转换为十六进制颜色
 * @param r 红色值 (0-255)
 * @param g 绿色值 (0-255)
 * @param b 蓝色值 (0-255)
 * @returns 十六进制颜色字符串
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (num: number) => {
    const hex = num.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}


/*
 * @Description: 
 * Ray版权所有
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved. 
 */
/*
 * @Description: 加载页组件 - 微信登录后的过渡加载动画页面
 * 显示同心圆脉冲动画和渐变进度条，进度达到100%后自动触发完成回调
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */

"use client"

import { useEffect, useState } from "react"
import styles from "@/styles/styles.module.css"

interface LoadingScreenProps {
  onComplete?: () => void
}
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  /* progress - 加载进度状态 (0-100) */
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      onComplete?.()
    }
  }, [progress, onComplete])

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCirclesWrapper}>
        <div className={styles.loadingCirclesGlow}></div>
        <div className={styles.loadingCircles}>
          <div className={`${styles.loadingRing} ${styles.loadingRing1}`}></div>
          <div className={`${styles.loadingRing} ${styles.loadingRing2}`}></div>
          <div className={`${styles.loadingRing} ${styles.loadingRing3}`}></div>
          <div className={`${styles.loadingRing} ${styles.loadingRing4}`}></div>
          <div className={`${styles.loadingRing} ${styles.loadingRing5}`}></div>
          <div className={styles.loadingCenter}></div>
        </div>
      </div>

      <h2 className={styles.loadingTitle}>正在连接梦境...</h2>
      <p className={styles.loadingSubtitle}>准备开启你的发型探索</p>

      <div className={styles.loadingProgressTrack}>
        <div className={styles.loadingProgressBar} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}

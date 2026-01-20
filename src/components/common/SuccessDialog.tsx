/*
 * @Description: 成功提示对话框组件 - 操作成功反馈
 * 用于显示操作成功的提示信息
 * 功能：显示成功图标、标题和消息、点击遮罩关闭
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */
"use client"

import { CheckCircle } from "lucide-react"
import styles from "@/styles/success-dialog.css"

interface SuccessDialogProps {
  isOpen: boolean
  title: string
  message?: string
  onClose: () => void
}

export function SuccessDialog({ isOpen, title, message, onClose }: SuccessDialogProps) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          <CheckCircle className={styles.icon} />
        </div>
        <h2 className={styles.title}>{title}</h2>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  )
}

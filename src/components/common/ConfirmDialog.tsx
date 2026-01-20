/*
 * @Description: 通用确认对话框组件 - 警告和危险操作确认
 * 用于显示警告或危险操作的确认提示
 * 功能：支持警告和危险两种类型、自定义按钮文本、点击遮罩关闭
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */
"use client"

import { AlertTriangle } from "lucide-react"
import styles from "@/styles/confirm-dialog.css"

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  type?: "warning" | "danger"
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "确认",
  cancelText = "取消",
  onConfirm,
  onCancel,
  type = "warning"
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.iconWrapper} ${styles[type]}`}>
          <AlertTriangle className={styles.icon} />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onCancel} className={styles.cancelButton}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { ReactNode } from "react"
import styles from "@/components/common/Modal.module.css"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  maxWidth?: string
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "32rem" }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth }}
      >
        {title && (
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{title}</h3>
            <button className={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
          </div>
        )}
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  )
}

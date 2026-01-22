/*
 * @Description: 首页组件 - 应用主界面
 * 展示用户个人信息、快捷功能入口和推荐内容
 * 功能：显示用户头像、快捷操作按钮、推荐发型卡片
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */
"use client"

import { useState } from "react"
import { Camera, Video, Check, User, Info } from "lucide-react"
import styles from "@/styles/home.module.css"
import { ProModeModal } from "@/components/business/ProModeModal"

// 导入store
import { useDataStore } from "@/lib/stores"

export function HomeScreen({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  // 从store获取发型和发色数据
  const { hairstyles, haircolors } = useDataStore()
  
  const [activeHairstyle, setActiveHairstyle] = useState(0)
  const [activeHaircolor, setActiveHaircolor] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  // 专业模式模态框状态
  const [showProMode, setShowProMode] = useState(false)

  // 滑块拖动事件处理
  const handleSliderMouseDown = () => {
    setIsDragging(true)
  }

  const handleSliderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const slider = e.currentTarget
      const rect = slider.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, x / rect.width))
      setSliderPosition(percentage)
      
      // 更新对应的发色
      const newIndex = Math.round(percentage * (haircolors.length - 1))
      setActiveHaircolor(newIndex)
    }
  }

  const handleSliderMouseUp = () => {
    setIsDragging(false)
  }

  const handleSliderTouchStart = () => {
    setIsDragging(true)
  }

  const handleSliderTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const slider = e.currentTarget
      const rect = slider.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const percentage = Math.max(0, Math.min(1, x / rect.width))
      setSliderPosition(percentage)
      
      // 更新对应的发色
      const newIndex = Math.round(percentage * (haircolors.length - 1))
      setActiveHaircolor(newIndex)
    }
  }

  // 发型分页状态
  const [currentHairstyleStart, setCurrentHairstyleStart] = useState(0)
  
  // 发色分页状态
  const [currentHaircolorStart, setCurrentHaircolorStart] = useState(0)

  // 发型列表切换函数
  const handlePrevHairstyles = () => {
    setCurrentHairstyleStart(prev => {
      const newStart = Math.max(0, prev - 1)
      // 确保当前选中的发型仍然在显示范围内
      if (activeHairstyle < newStart || activeHairstyle >= newStart + 5) {
        // 如果不在显示范围内，自动选中新范围内的第一个发型
        setActiveHairstyle(newStart)
      }
      return newStart
    })
  }

  const handleNextHairstyles = () => {
    setCurrentHairstyleStart(prev => {
      const newStart = Math.min(prev + 1, hairstyles.length - 5)
      // 确保当前选中的发型仍然在显示范围内
      if (activeHairstyle < newStart || activeHairstyle >= newStart + 5) {
        // 如果不在显示范围内，自动选中新范围内的第一个发型
        setActiveHairstyle(newStart)
      }
      return newStart
    })
  }
  
  // 发色列表切换函数
  const handlePrevHaircolors = () => {
    setCurrentHaircolorStart(prev => {
      const newStart = Math.max(0, prev - 1)
      // 确保当前选中的发色仍然在显示范围内
      if (activeHaircolor < newStart || activeHaircolor >= newStart + 5) {
        // 如果不在显示范围内，自动选中新范围内的第一个发色
        setActiveHaircolor(newStart)
      }
      return newStart
    })
  }
  
  const handleNextHaircolors = () => {
    setCurrentHaircolorStart(prev => {
      const newStart = Math.min(prev + 1, haircolors.length - 5)
      // 确保当前选中的发色仍然在显示范围内
      if (activeHaircolor < newStart || activeHaircolor >= newStart + 5) {
        // 如果不在显示范围内，自动选中新范围内的第一个发色
        setActiveHaircolor(newStart)
      }
      return newStart
    })
  }

  const handleSliderTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className={styles.container}>
      {/* 顶部导航 */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.hashtag}>型识</span>
          <button className={styles.tryOnBtn}>AR试戴</button>
        </div>
        <div className={styles.userAvatar}>
          <User className={styles.avatarIcon} />
        </div>
      </header>

      {/* 发型选择标签 - 显示当前选中的发型和发色 */}
      <div className={styles.hairstyleTag}>
        <div className={styles.selectedInfo}>
          <span className={styles.tagText}>{hairstyles[activeHairstyle].name}</span>
          <div className={styles.colorIndicator} style={{ backgroundColor: haircolors[activeHaircolor].color }}></div>
          <span className={styles.haircolorText}>{haircolors[activeHaircolor].name}</span>
        </div>
        <div className={styles.tagIndicator}></div>
      </div>

      {/* 相机区域 */}
      <div className={styles.cameraContainer}>
        {/* 相机占位符 */}
        <div className={styles.cameraPlaceholder}>
          <div className={styles.cameraGuide}>
            <div className={styles.cameraCircle}>
              <Camera className={styles.cameraIcon} />
            </div>
            <p className={styles.guideText}>开启摄像头，<br/>实时试戴发型与发色。</p>
          </div>
        </div>

        {/* 底部控制按钮 */}
        <div className={styles.controlButtons}>
          <button className={styles.controlBtn}>
            <Video className={styles.controlIcon} />
          </button>
          <button className={`${styles.controlBtn} ${styles.primaryBtn}`}>
            <Camera className={styles.controlIcon} />
          </button>
          <button className={styles.controlBtn}>
            <Check className={styles.controlIcon} />
          </button>
        </div>
      </div>

      {/* 发型库 */}
      <div className={styles.hairstyleLibrary}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>发型库</span>
          <span className={styles.haircount}>{hairstyles.length}</span>
        </div>

        {/* 发型列表 */}
        <div className={styles.hairstyleList}>
          {hairstyles.slice(currentHairstyleStart, currentHairstyleStart + 5).map((style: typeof hairstyles[0], index: number) => {
            const fullIndex = currentHairstyleStart + index;
            return (
              <div 
                key={style.id} 
                className={`${styles.hairstyleItem} ${fullIndex === activeHairstyle ? styles.activeHairstyle : ''}`}
                onClick={() => setActiveHairstyle(fullIndex)}
              >
                <div className={styles.hairstyleIcon}>
                  {/* SVG发型图片 - 根据不同发型生成不同设计 */}
                  <svg width="48" height="48" viewBox="0 0 48 48" className={styles.hairstyleImage}>
                    {/* 基础头部 */}
                    <circle cx="24" cy="16" r="8" fill="#333" />
                    <circle cx="24" cy="28" r="12" fill="#f5e0c3" />
                    
                    {/* 根据发型ID显示不同的发型设计 */}
                    {fullIndex === 0 && (
                      /* 齐肩短发 */
                      <g fill="#333">
                        <rect x="16" y="20" width="16" height="16" rx="4" />
                        <path d="M14 24 Q12 22 12 18 Q12 26 14 30" />
                        <path d="M34 24 Q36 22 36 18 Q36 26 34 30" />
                      </g>
                    )}
                    {fullIndex === 1 && (
                      /* 层次长发 */
                      <g fill="#333">
                        <rect x="14" y="20" width="20" height="22" rx="6" />
                        <path d="M12 28 Q10 26 10 22" />
                        <path d="M36 28 Q38 26 38 22" />
                      </g>
                    )}
                    {fullIndex === 2 && (
                      /* 空气刘海 */
                      <g fill="#333">
                        <path d="M16 20 Q18 16 20 16 Q22 16 24 16 Q26 16 28 16 Q30 16 32 20" />
                        <rect x="16" y="20" width="16" height="18" rx="4" />
                      </g>
                    )}
                    {fullIndex === 3 && (
                      /* 波浪卷发 */
                      <g fill="#333">
                        <path d="M16 20 C14 22 13 25 13 28" />
                        <path d="M18 20 C16 22 15 25 15 28" />
                        <path d="M20 20 C18 22 17 25 17 28" />
                        <path d="M32 20 C34 22 35 25 35 28" />
                        <path d="M30 20 C32 22 33 25 33 28" />
                        <path d="M28 20 C30 22 31 25 31 28" />
                        <rect x="16" y="28" width="16" height="14" rx="6" />
                      </g>
                    )}
                    {fullIndex === 4 && (
                      /* 高马尾 */
                      <g fill="#333">
                        <rect x="20" y="8" width="8" height="16" rx="4" />
                        <circle cx="24" cy="8" r="6" />
                        <path d="M18 24 Q20 22 22 22" />
                        <path d="M30 24 Q28 22 26 22" />
                        <rect x="16" y="24" width="16" height="18" rx="4" />
                      </g>
                    )}
                    {fullIndex === 5 && (
                      /* 低丸子头 */
                      <g fill="#333">
                        <path d="M18 24 Q20 22 22 22" />
                        <path d="M30 24 Q28 22 26 22" />
                        <rect x="16" y="24" width="16" height="18" rx="4" />
                        <circle cx="24" cy="32" r="5" />
                        <rect x="23" y="28" width="2" height="8" />
                      </g>
                    )}
                    {fullIndex === 6 && (
                      /* 法式刘海 */
                      <g fill="#333">
                        <path d="M16 20 Q18 14 20 14 Q22 14 24 14 Q26 14 28 14 Q30 14 32 20" />
                        <rect x="16" y="20" width="16" height="18" rx="4" />
                        <path d="M14 26 Q12 24 12 20" />
                        <path d="M34 26 Q36 24 36 20" />
                      </g>
                    )}
                    {fullIndex === 7 && (
                      /* 纹理短发 */
                      <g fill="#333">
                        <path d="M16 20 Q14 22 13 24" />
                        <path d="M18 20 Q16 22 15 24" />
                        <path d="M20 20 Q18 22 17 24" />
                        <path d="M32 20 Q34 22 35 24" />
                        <path d="M30 20 Q32 22 33 24" />
                        <path d="M28 20 Q30 22 31 24" />
                        <rect x="16" y="24" width="16" height="14" rx="4" />
                      </g>
                    )}
                    {fullIndex === 8 && (
                      /* 编发辫 */
                      <g fill="#333">
                        <rect x="16" y="20" width="16" height="20" rx="4" />
                        <path d="M16 22 Q14 24 13 28" />
                        <path d="M32 22 Q34 24 35 28" />
                        <path d="M20 20 Q18 22 18 24 L18 36" />
                        <path d="M28 20 Q30 22 30 24 L30 36" />
                      </g>
                    )}
                    {fullIndex === 9 && (
                      /* 离子直发 */
                      <g fill="#333">
                        <rect x="15" y="20" width="18" height="22" rx="6" />
                        <path d="M13 26 Q11 24 11 20" />
                        <path d="M35 26 Q37 24 37 20" />
                      </g>
                    )}
                    {fullIndex === 10 && (
                      /* 微卷长发 */
                      <g fill="#333">
                        <rect x="14" y="20" width="20" height="22" rx="8" />
                        <path d="M12 26 Q10 24 10 20" />
                        <path d="M36 26 Q38 24 38 20" />
                        <path d="M14 22 Q12 20 12 18" />
                        <path d="M34 22 Q36 20 36 18" />
                      </g>
                    )}
                    {fullIndex === 11 && (
                      /* 齐刘海短发 */
                      <g fill="#333">
                        <rect x="16" y="20" width="16" height="16" rx="4" />
                        <path d="M14 20 Q12 18 12 14" />
                        <path d="M34 20 Q36 18 36 14" />
                        <rect x="14" y="16" width="20" height="4" rx="2" />
                      </g>
                    )}
                    {fullIndex === 12 && (
                      /* 公主切 */
                      <g fill="#333">
                        <rect x="14" y="20" width="20" height="22" rx="4" />
                        <rect x="12" y="20" width="4" height="22" rx="2" />
                        <rect x="32" y="20" width="4" height="22" rx="2" />
                        <path d="M16 16 Q20 14 24 14 Q28 14 32 16" />
                      </g>
                    )}
                    {fullIndex === 13 && (
                      /* 羊毛卷 */
                      <g fill="#333">
                        <circle cx="24" cy="20" r="12" />
                        <circle cx="18" cy="16" r="4" />
                        <circle cx="30" cy="16" r="4" />
                        <circle cx="16" cy="24" r="4" />
                        <circle cx="32" cy="24" r="4" />
                        <circle cx="24" cy="28" r="4" />
                        <circle cx="18" cy="32" r="4" />
                        <circle cx="30" cy="32" r="4" />
                      </g>
                    )}
                    {fullIndex === 14 && (
                      /* 鲻鱼头 */
                      <g fill="#333">
                        <rect x="16" y="20" width="16" height="12" rx="4" />
                        <rect x="14" y="32" width="20" height="10" rx="2" />
                        <path d="M12 24 Q10 22 10 18" />
                        <path d="M36 24 Q38 22 38 18" />
                      </g>
                    )}
                  </svg>
                </div>
                <span className={styles.hairstyleName}>{style.name}</span>
                {fullIndex === activeHairstyle && (
                  <div className={styles.activeIndicator}>
                    <Check className={styles.checkIcon} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 右下角箭头按钮 */}
        <div className={styles.arrowButtonsContainer}>
          <button 
            className={`${styles.arrowBtn} ${styles.leftArrow}`}
            onClick={handlePrevHairstyles}
            disabled={currentHairstyleStart === 0}
          >
            ←
          </button>
          <button 
            className={`${styles.arrowBtn} ${styles.rightArrow}`}
            onClick={handleNextHairstyles}
            disabled={currentHairstyleStart >= hairstyles.length - 5}
          >
            →
          </button>
        </div>

        {/* 发色盘 */}
        <div className={styles.haircolorSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>发色盘</span>
            <button 
              className={styles.sectionAction}
              onClick={() => setShowProMode(true)}
            >
              专业模式
            </button>
          </div>

          {/* 发色选择带箭头按钮 */}
          <div className={styles.haircolorWithArrows}>
            <button 
              className={`${styles.arrowBtn} ${styles.leftArrow}`}
              onClick={handlePrevHaircolors}
              disabled={currentHaircolorStart === 0}
            >
              ←
            </button>
            
            {/* 发色选择 */}
            <div className={styles.haircolorList}>
              {haircolors.slice(currentHaircolorStart, currentHaircolorStart + 5).map((color: typeof haircolors[0], index: number) => {
                const fullIndex = currentHaircolorStart + index;
                return (
                  <button
                    key={color.id}
                    className={`${styles.haircolorItem} ${fullIndex === activeHaircolor ? styles.activeHaircolor : ''}`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => {
                      setActiveHaircolor(fullIndex)
                      setSliderPosition(fullIndex / (haircolors.length - 1))
                    }}
                  >
                    {fullIndex === activeHaircolor && (
                      <Check className={styles.checkIcon} />
                    )}
                  </button>
                );
              })}
            </div>
            
            <button 
              className={`${styles.arrowBtn} ${styles.rightArrow}`}
              onClick={handleNextHaircolors}
              disabled={currentHaircolorStart >= haircolors.length - 5}
            >
              →
            </button>
          </div>

          {/* 发色名称 */}
          <div className={styles.haircolorNames}>
            {haircolors.slice(currentHaircolorStart, currentHaircolorStart + 5).map((color: typeof haircolors[0], index: number) => {
              const fullIndex = currentHaircolorStart + index;
              return (
                <button
                  key={color.id} 
                  className={`${styles.haircolorName} ${fullIndex === activeHaircolor ? styles.activeHaircolorName : ''}`}
                  onClick={() => {
                    setActiveHaircolor(fullIndex)
                    setSliderPosition(fullIndex / (haircolors.length - 1))
                  }}
                >
                  {color.name}
                </button>
              );
            })}
          </div>

          {/* 滑动条 */}
          <div className={styles.sliderContainer}>
            <div 
              className={styles.slider}
              onMouseDown={(e) => {
                handleSliderMouseDown()
                // 点击滑块时直接定位
                const slider = e.currentTarget
                const rect = slider.getBoundingClientRect()
                const x = e.clientX - rect.left
                const percentage = Math.max(0, Math.min(1, x / rect.width))
                setSliderPosition(percentage)
                
                // 更新对应的发色
                const newIndex = Math.round(percentage * (haircolors.length - 1))
                setActiveHaircolor(newIndex)
              }}
              onMouseMove={handleSliderMouseMove}
              onMouseUp={handleSliderMouseUp}
              onMouseLeave={handleSliderMouseUp}
              onTouchStart={(e) => {
                handleSliderTouchStart()
                // 触摸滑块时直接定位
                const slider = e.currentTarget
                const rect = slider.getBoundingClientRect()
                const x = e.touches[0].clientX - rect.left
                const percentage = Math.max(0, Math.min(1, x / rect.width))
                setSliderPosition(percentage)
                
                // 更新对应的发色
                const newIndex = Math.round(percentage * (haircolors.length - 1))
                setActiveHaircolor(newIndex)
              }}
              onTouchMove={handleSliderTouchMove}
              onTouchEnd={handleSliderTouchEnd}
              onTouchCancel={handleSliderTouchEnd}
            >
              <div className={styles.sliderTrack}></div>
              <div 
                className={styles.sliderThumb}
                style={{ left: `${sliderPosition * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 功能按钮 */}
        <div className={styles.functionButtons}>
          <button className={styles.functionBtn}>
            <Camera className={styles.functionIcon} />
            <div className={styles.functionText}>
              <div className={styles.functionTitle}>拍照分析</div>
              <div className={styles.functionDesc}>AI推荐最适合您的...</div>
            </div>
          </button>
          <button className={styles.functionBtn}>
            <Check className={styles.functionIcon} />
            <div className={styles.functionText}>
              <div className={styles.functionTitle}>对比模式</div>
              <div className={styles.functionDesc}>开启对比</div>
            </div>
          </button>
        </div>

        {/* 使用提示 */}
        <div className={styles.tipsContainer}>
          <div className={styles.tipsHeader}>
            <Info className={styles.infoIcon} />
            <span className={styles.tipsTitle}>使用提示</span>
          </div>
          <ul className={styles.tipsList}>
            <li className={styles.tipItem}>1. 确保光线充足，正对摄像头</li>
            <li className={styles.tipItem}>2. 点击发型库中的发型可实时试戴</li>
            <li className={styles.tipItem}>3. 滑动色条或点击色盘更换发色</li>
            <li className={styles.tipItem}>4. 开启对比模式查看效果差异</li>
            <li className={styles.tipItem}>5. 拍照后AI将为您推荐3-5款发型</li>
          </ul>
        </div>
      </div>

      <ProModeModal 
        isOpen={showProMode} 
        onClose={() => setShowProMode(false)}
        onTabChange={onTabChange}
      />
    </div>
  )
}

/*
 * @Description: 首页组件 - 应用主界面
 * 展示用户个人信息、快捷功能入口和推荐内容
 * 功能：显示用户头像、快捷操作按钮、推荐发型卡片
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */
"use client"

import { useState, useEffect } from "react"
import { Camera, Video, Check, User, Info } from "lucide-react"
import styles from "@/styles/home.module.css"

export function HomeScreen({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  const [activeHairstyle, setActiveHairstyle] = useState(0)
  const [activeHaircolor, setActiveHaircolor] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  // 专业模式模态框状态
  const [showProMode, setShowProMode] = useState(false)
  const [colorMode, setColorMode] = useState<'rgb' | 'rgba'>('rgb')
  const [rgbValues, setRgbValues] = useState({ r: 147, g: 51, b: 234 }) // 默认紫色
  const [alpha, setAlpha] = useState(1)
  const [mixedColor, setMixedColor] = useState('#9333ea')

  // RGB值变化时更新混合颜色
  useEffect(() => {
    const { r, g, b } = rgbValues
    // 将RGB值转换为十六进制颜色
    const toHex = (num: number) => {
      const hex = num.toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    }
    
    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`
    setMixedColor(hexColor)
  }, [rgbValues])

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

  const handleSliderTouchEnd = () => {
    setIsDragging(false)
  }

  const hairstyles = [
    { id: 1, name: "梦幻波浪" },
    { id: 2, name: "深海短发" },
    { id: 3, name: "幻光长发" },
    { id: 4, name: "星空编发" }
  ]

  const haircolors = [
    { id: 1, name: "梦境紫", color: "#9333ea" },
    { id: 2, name: "深海蓝", color: "#3b82f6" },
    { id: 3, name: "幻光粉", color: "#ec4899" },
    { id: 4, name: "星辰银", color: "#d1d5db" },
    { id: 5, name: "暮光金", color: "#f59e0b" }
  ]

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

      {/* 发型选择标签 */}
      <div className={styles.hairstyleTag}>
        <span className={styles.tagText}>{hairstyles[activeHairstyle].name}</span>
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
            <p className={styles.guideText}>开启摄像头，实时试戴发型与发色</p>
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
          <span className={styles.haircount}>5</span>
        </div>

        {/* 发型列表 */}
        <div className={styles.hairstyleList}>
          {hairstyles.map((style, index) => (
            <div 
              key={style.id} 
              className={`${styles.hairstyleItem} ${index === activeHairstyle ? styles.activeHairstyle : ''}`}
              onClick={() => setActiveHairstyle(index)}
            >
              <div className={styles.hairstyleIcon}>
                <div className={styles.headOutline}></div>
              </div>
              <span className={styles.hairstyleName}>{style.name}</span>
              {index === activeHairstyle && (
                <div className={styles.activeIndicator}>
                  <Check className={styles.checkIcon} />
                </div>
              )}
            </div>
          ))}
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

          {/* 发色选择 */}
          <div className={styles.haircolorList}>
            {haircolors.map((color, index) => (
              <button
                key={color.id}
                className={`${styles.haircolorItem} ${index === activeHaircolor ? styles.activeHaircolor : ''}`}
                style={{ backgroundColor: color.color }}
                onClick={() => {
                  setActiveHaircolor(index)
                  setSliderPosition(index / (haircolors.length - 1))
                }}
              >
                {index === activeHaircolor && (
                  <Check className={styles.checkIcon} />
                )}
              </button>
            ))}
          </div>

          {/* 发色名称 */}
          <div className={styles.haircolorNames}>
            {haircolors.map((color, index) => (
              <button
                key={color.id} 
                className={`${styles.haircolorName} ${index === activeHaircolor ? styles.activeHaircolorName : ''}`}
                onClick={() => {
                  setActiveHaircolor(index)
                  setSliderPosition(index / (haircolors.length - 1))
                }}
              >
                {color.name}
              </button>
            ))}
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

      {/* 专业模式模态框 */}
      {showProMode && (
        <div className={styles.modalOverlay} onClick={() => setShowProMode(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>专业发色调配</h3>
              <button 
                className={styles.closeBtn}
                onClick={() => setShowProMode(false)}
              >
                ✕
              </button>
            </div>

            {/* 颜色模式选择 */}
            <div className={styles.colorModeTabs}>
              <button 
                className={`${styles.modeTab} ${colorMode === 'rgb' ? styles.activeMode : ''}`}
                onClick={() => setColorMode('rgb')}
              >
                RGB模式
              </button>
              <button 
                className={`${styles.modeTab} ${colorMode === 'rgba' ? styles.activeMode : ''}`}
                onClick={() => setColorMode('rgba')}
              >
                RGBA模式
              </button>
            </div>

            {/* RGB/RGBA数值输入 */}
            <div className={styles.colorInputSection}>
              <h4 className={styles.sectionSubtitle}>颜色数值输入</h4>
              <div className={styles.rgbInputs}>
                <div className={styles.colorInputGroup}>
                  <label className={styles.inputLabel}>R</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="255" 
                    className={styles.colorInput}
                    value={rgbValues.r}
                    onChange={(e) => setRgbValues({ ...rgbValues, r: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className={styles.colorInputGroup}>
                  <label className={styles.inputLabel}>G</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="255" 
                    className={styles.colorInput}
                    value={rgbValues.g}
                    onChange={(e) => setRgbValues({ ...rgbValues, g: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className={styles.colorInputGroup}>
                  <label className={styles.inputLabel}>B</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="255" 
                    className={styles.colorInput}
                    value={rgbValues.b}
                    onChange={(e) => setRgbValues({ ...rgbValues, b: parseInt(e.target.value) || 0 })}
                  />
                </div>
                {colorMode === 'rgba' && (
                  <div className={styles.colorInputGroup}>
                    <label className={styles.inputLabel}>A</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      className={styles.colorInput}
                      value={alpha}
                      onChange={(e) => setAlpha(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                )}
              </div>

              {/* 颜色预览 */}
              <div className={styles.colorPreviewSection}>
                <div 
                  className={styles.colorPreview}
                  style={{
                    backgroundColor: colorMode === 'rgb' 
                      ? `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`
                      : `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})`
                  }}
                ></div>
                <div className={styles.colorValue}>
                  {colorMode === 'rgb' 
                    ? `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`
                    : `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})`}
                </div>
              </div>
            </div>

            {/* 三原色调配 */}
            <div className={styles.primaryMixSection}>
              <h4 className={styles.sectionSubtitle}>三原色调配</h4>
              <div className={styles.primaryMixContent}>
                <p className={styles.mixDescription}>根据三原色比例生成混合颜色：</p>
                <div className={styles.primarySliders}>
                  <div className={styles.sliderGroup}>
                    <label className={styles.sliderLabel}>红色 (R): {rgbValues.r}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="255" 
                      className={styles.primarySlider}
                      value={rgbValues.r}
                      onChange={(e) => setRgbValues({ ...rgbValues, r: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className={styles.sliderGroup}>
                    <label className={styles.sliderLabel}>绿色 (G): {rgbValues.g}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="255" 
                      className={styles.primarySlider}
                      value={rgbValues.g}
                      onChange={(e) => setRgbValues({ ...rgbValues, g: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className={styles.sliderGroup}>
                    <label className={styles.sliderLabel}>蓝色 (B): {rgbValues.b}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="255" 
                      className={styles.primarySlider}
                      value={rgbValues.b}
                      onChange={(e) => setRgbValues({ ...rgbValues, b: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* 混合颜色预览 */}
                <div className={styles.mixedColorSection}>
                  <h5 className={styles.mixedTitle}>混合结果</h5>
                  <div 
                    className={styles.mixedColorPreview}
                    style={{ backgroundColor: mixedColor }}
                  ></div>
                  <div className={styles.mixedColorValue}>{mixedColor}</div>
                </div>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className={styles.modalFooter}>
              <button 
                className={styles.seeLaterBtn}
                onClick={() => {
                  setShowProMode(false)
                  // 跳转到效果页面
                  if (onTabChange) {
                    onTabChange('effects')
                  }
                }}
              >
                See u later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
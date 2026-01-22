"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/common/Modal"
import { rgbToHex } from "@/lib/utils"
import { generateDiyFormula, getTargetColor, UserHairData, FormulaResult } from "../../utils/hairstyling"
import styles from "@/styles/home.module.css"

interface ProModeModalProps {
  isOpen: boolean
  onClose: () => void
  onTabChange?: (tab: string) => void
}

export function ProModeModal({ isOpen, onClose, onTabChange }: ProModeModalProps) {
  const [activeMode, setActiveMode] = useState<'rgb' | 'diy'>('rgb')
  const [showAlpha, setShowAlpha] = useState(false)
  const [rgbValues, setRgbValues] = useState({ r: 147, g: 51, b: 234 })
  const [alpha, setAlpha] = useState(1)
  const [mixedColor, setMixedColor] = useState('#9333ea')
  
  const [isCalculating, setIsCalculating] = useState(false)
  const [diyFormula, setDiyFormula] = useState<FormulaResult | null>(null)
  const [targetColorInput, setTargetColorInput] = useState('#9333ea')
  
  const [primaryMixValues, setPrimaryMixValues] = useState({ r: 147, g: 51, b: 234 })
  const [primaryMixedColor, setPrimaryMixedColor] = useState('#9333ea')
  
  const userHairData: UserHairData = {
    baseLevel: 5,
    undertone: "yellow",
    hairTexture: "normal"
  }
  
  const handleCalculateFormula = () => {
    setIsCalculating(true)
    setTimeout(() => {
      const formula = generateDiyFormula(userHairData, getTargetColor(targetColorInput))
      setDiyFormula(formula)
      setIsCalculating(false)
    }, 2000)
  }

  useEffect(() => {
    const { r, g, b } = rgbValues
    const hexColor = rgbToHex(r, g, b)
    setMixedColor(hexColor)
    setTargetColorInput(hexColor)
  }, [rgbValues, activeMode, showAlpha])

  useEffect(() => {
    const { r, g, b } = primaryMixValues
    const hexColor = rgbToHex(r, g, b)
    setPrimaryMixedColor(hexColor)
  }, [primaryMixValues])

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="专业发色调配"
    >
      <div className={styles.colorModeTabs}>
        <button 
          className={`${styles.modeTab} ${activeMode === 'rgb' ? styles.activeMode : ''}`}
          onClick={() => setActiveMode('rgb')}
        >
          RGB/RGBA模式
        </button>
        <button 
          className={`${styles.modeTab} ${activeMode === 'diy' ? styles.activeMode : ''}`}
          onClick={() => setActiveMode('diy')}
        >
          DIY模式
        </button>
      </div>

      <>
        <div className={styles.colorInputSection}>
          <h4 className={styles.sectionSubtitle}>颜色数值输入</h4>
          <div className={styles.rgbInputsWrapper}>
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
              <div className={`${styles.colorInputGroup} ${styles.alphaToggleContainer}`}>
                <button 
                  className={`${styles.alphaToggleBtn} ${showAlpha ? styles.alphaToggleBtnActive : ''}`}
                  onClick={() => setShowAlpha(!showAlpha)}
                >
                  <span className={styles.alphaToggleLabel}>A</span>
                </button>
              </div>
              {showAlpha && (
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
            
            <div className={styles.equalsSignContainer}>
              <div className={styles.equalsSign}>=</div>
            </div>
            
            <div className={styles.colorResultSection}>
              <div 
                className={styles.colorPreview}
                style={{
                  backgroundColor: showAlpha 
                    ? `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})`
                    : `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`
                }}
              ></div>
              <div className={styles.colorLabel}>{showAlpha ? 'RGBA' : 'RGB'}</div>
              <div className={styles.colorValue}>{mixedColor}</div>
            </div>
          </div>
        </div>

        <div className={styles.primaryMixSection}>
          <h4 className={styles.sectionSubtitle}>三原色调配</h4>
          <div className={styles.primaryMixContent}>
            <p className={styles.mixDescription}>根据三原色比例生成混合颜色：</p>
            <div className={styles.primarySliders}>
              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>红色 (R): {primaryMixValues.r}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  className={styles.primarySlider}
                  value={primaryMixValues.r}
                  onChange={(e) => setPrimaryMixValues({ ...primaryMixValues, r: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>绿色 (G): {primaryMixValues.g}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  className={styles.primarySlider}
                  value={primaryMixValues.g}
                  onChange={(e) => setPrimaryMixValues({ ...primaryMixValues, g: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>蓝色 (B): {primaryMixValues.b}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  className={styles.primarySlider}
                  value={primaryMixValues.b}
                  onChange={(e) => setPrimaryMixValues({ ...primaryMixValues, b: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className={styles.mixedColorSection}>
              <h5 className={styles.mixedTitle}>混合结果</h5>
              <div 
                className={styles.mixedColorPreview}
                style={{ backgroundColor: primaryMixedColor }}
              ></div>
              <div className={styles.mixedColorValue}>{primaryMixedColor}</div>
            </div>
          </div>
        </div>
        
        <div className={styles.diySection}>
          <h4 className={styles.sectionSubtitle}>智能染发配比</h4>
          
          <div className={styles.diyIntro}>
            <p className={styles.diyDescription}>基于专业染发"减法"和"中和"原则，为您生成精确的染发配方</p>
          </div>
          
          <div className={styles.colorInputSection}>
            <div className={styles.colorInputGroup}>
              <label className={styles.inputLabel}>目标颜色</label>
              <div className={styles.colorPickerContainer}>
                <input 
                  type="color" 
                  className={styles.colorPicker}
                  value={targetColorInput}
                  onChange={(e) => setTargetColorInput(e.target.value)}
                />
                <input 
                  type="text" 
                  className={styles.hexInput}
                  value={targetColorInput}
                  onChange={(e) => {
                    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                    if (hexPattern.test(e.target.value)) {
                      setTargetColorInput(e.target.value);
                    }
                  }}
                  placeholder="#9333ea"
                />
              </div>
            </div>
          </div>
          
          <div className={styles.calculateSection}>
            <button 
              className={styles.calculateBtn}
              onClick={handleCalculateFormula}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <span className={styles.loadingSpinner}></span>
                  <span>计算中...</span>
                </>
              ) : (
                <>
                  <span>生成DIY配方</span>
                </>
              )}
            </button>
          </div>
          
          <div className={styles.scaleReminder}>
            <div className={styles.scaleIcon}></div>
            <p className={styles.scaleText}>
              <span className={styles.warningIcon}>⚠️</span>
              请精确到 1g，这是上色均匀的关键
            </p>
          </div>
          
          {isCalculating ? (
            <div className={styles.calculatingAnimation}>
              <div className={styles.progressBall}></div>
              <p className={styles.animationText}>正在进行化学计算...</p>
            </div>
          ) : diyFormula ? (
            <div className={styles.formulaResult}>
              <h5 className={styles.formulaTitle}>DIY染发配方</h5>
              <div className={styles.formulaSteps}>
                <div className={styles.formulaStep}>
                  <span className={styles.stepNumber}>1</span>
                  <span className={styles.stepText}>{diyFormula.step1}</span>
                </div>
                <div className={styles.formulaStep}>
                  <span className={styles.stepNumber}>2</span>
                  <span className={styles.stepText}>{diyFormula.step2}</span>
                </div>
                <div className={styles.formulaStep}>
                  <span className={styles.stepNumber}>3</span>
                  <span className={styles.stepText}>{diyFormula.step3}</span>
                </div>
                <div className={styles.formulaStep}>
                  <span className={styles.stepNumber}>4</span>
                  <span className={styles.stepText}>{diyFormula.step4}</span>
                </div>
                {diyFormula.tips && (
                  <div className={styles.formulaTip}>
                    <span className={styles.tipIcon}>💡</span>
                    <span className={styles.tipText}>{diyFormula.tips}</span>
                  </div>
                )}
              </div>
              
              <div className={styles.purchaseSection}>
                <h6 className={styles.purchaseTitle}>推荐产品</h6>
                <div className={styles.productList}>
                  <div className={styles.productItem}>
                    <div className={styles.productInfo}>
                      <span className={styles.productName}>专业染膏</span>
                      <span className={styles.productPrice}>¥89.9</span>
                    </div>
                    <button className={styles.buyBtn}>加购</button>
                  </div>
                  <div className={styles.productItem}>
                    <div className={styles.productInfo}>
                      <span className={styles.productName}>双氧乳</span>
                      <span className={styles.productPrice}>¥39.9</span>
                    </div>
                    <button className={styles.buyBtn}>加购</button>
                  </div>
                  <div className={styles.productItem}>
                    <div className={styles.productInfo}>
                      <span className={styles.productName}>护发精华</span>
                      <span className={styles.productPrice}>¥59.9</span>
                    </div>
                    <button className={styles.buyBtn}>加购</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.emptyFormula}>
              <p className={styles.emptyText}>点击上方按钮生成您的专属配方</p>
            </div>
          )}
        </div>
      </>

      <div className={styles.modalFooter}>
        <button 
          className={styles.seeLaterBtn}
          onClick={() => {
            onClose()
            if (onTabChange) {
              onTabChange('effects')
            }
          }}
        >
          See u later
        </button>
      </div>
    </Modal>
  )
}

/*
 * @Description: 发型设计算法模块
 * 包含智能染发配比算法和相关工具函数
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */

// 用户头发数据接口
export interface UserHairData {
  baseLevel: number;       // 底色度数（1-10级，1为黑，10为极浅金）
  undertone: string;       // 底色色调（冷、暖、红、黄、橙）
  hairTexture: string;     // 发质（normal, damaged, resistant）
}

// 目标颜色数据接口
export interface TargetColor {
  targetLevel: number;     // 目标度数（1-10级）
  targetReflect: string;   // 目标色调（冷、暖）
}

// 配方结果接口
export interface FormulaResult {
  step1: string;           // 步骤1：主色染膏
  step2: string;           // 步骤2：修正色
  step3: string;           // 步骤3：双氧奶
  step4: string;           // 步骤4：等待时间
  tips?: string;           // 专业提示
}

/**
 - ShapeSense 智能配比算法 v1.0
 - 输入：用户底色数据，目标颜色数据
 - 输出：调配方案（药剂型号、比例、操作时间）
 - 基于专业染发"减法"和"中和"原则的三维色彩转换模型
 */
export const generateDiyFormula = (userHairData: UserHairData, targetColor: TargetColor): FormulaResult => {
  const { baseLevel, undertone, hairTexture } = userHairData; // C_base (底色)
  const { targetLevel, targetReflect } = targetColor; // C_target (目标色)
  
  // 初始化配方对象 R_formula (最终配方)
  let formula = {
      primaryDye: "",    // 主色染膏
      modifierDye: "",   // 修正色（对冲色）
      modifierGrams: "", // 修正色克数
      developer: "",     // V_volume (双氧乳浓度)
      ratio: "1:1",      // 混合比例
      waitTime: 30,      // 建议等待分钟
      tips: ""           // 专业提示
  };
  
  // 1. 计算度数差（提浅或压深）
  const levelDiff = targetLevel - baseLevel;
  
  // 2. 选择双氧乳浓度 (V_volume) - 决定提浅能力
  if (levelDiff <= 0) {
    formula.developer = "6% (20Vol)"; // 盖深或同度染
  } else if (levelDiff === 1 || levelDiff === 2) {
    formula.developer = "9% (30Vol)"; // 提浅1-2度
  } else {
    formula.developer = "12% (40Vol)"; // 强力提浅3度以上
  }
  
  // 3. 主色染膏选择逻辑
  // 根据目标度数和色调确定主色染膏
  const baseTone = targetReflect === "cold" ? "N" : "W"; // N: 冷色, W: 暖色
  formula.primaryDye = `${targetLevel}${baseTone}`;
  
  // 4. 色调对冲逻辑 (Neutralization) - 基于"减法"原则
  // 根据底色色调和目标色调的差异，添加相应的修正色
  if (undertone === "yellow" && targetReflect === "cold") {
    // 底色偏黄，目标冷色，需加入紫色对冲
    formula.modifierDye = "0/66 (Violet Modifier)";
    formula.modifierGrams = "3g - 5g"; // 少量对冲
  } else if (undertone === "red" && targetReflect === "cold") {
    // 底色偏红，目标冷色，需加入绿色对冲
    formula.modifierDye = "0/22 (Green Modifier)";
    formula.modifierGrams = "4g - 6g"; // 适量对冲
  } else if (undertone === "orange" && targetReflect === "cold") {
    // 底色偏橙，目标冷色，需加入蓝色对冲
    formula.modifierDye = "0/88 (Blue Modifier)";
    formula.modifierGrams = "3g - 5g"; // 适量对冲
  }
  
  // 5. 发质修正 (Texture Adjustment)
  if (hairTexture === "damaged") {
    formula.waitTime -= 5; // 受损发质上色快，需缩短时间
    formula.tips = "建议加入隔离精华，保护毛鳞片";
  } else if (hairTexture === "resistant") {
    formula.waitTime += 5; // 抗拒发质上色慢，需延长时间
    formula.tips = "建议提高双氧乳浓度或延长停留时间";
  }
  
  // 6. 计算具体克数（基于标准60g染膏用量）
  const totalDyeWeight = 60; // 总染膏重量
  const developerWeight = totalDyeWeight; // 1:1比例
  
  // 7. 生成最终文案 - 精确到1g的专业配方
  return {
      step1: `选取 ${formula.primaryDye} 号染膏 ${totalDyeWeight}g`,
      step2: `加入修正色 ${formula.modifierDye || '无'} ${formula.modifierGrams || '0g'}`,
      step3: `混合 ${formula.developer} 双氧奶 ${developerWeight}ml，比例 ${formula.ratio}`,
      step4: `均匀涂抹后停留 ${formula.waitTime} 分钟`,
      tips: formula.tips
  };
};

/**
 * 从用户输入的颜色中提取目标颜色信息
 * @param targetColorInput 用户输入的十六进制颜色值
 * @returns 目标颜色数据
 */
export const getTargetColor = (targetColorInput: string): TargetColor => {
  // 从用户输入的颜色中提取色调信息
  // 简单判断：紫色系、蓝色系等偏冷色，黄色系、红色系等偏暖色
  const hex = targetColorInput.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // 计算冷色调指数：蓝紫色系值较高则为冷色
  const coldToneIndex = (b + r) / 2 - g;
  const targetReflect = coldToneIndex > 30 ? "cold" : "warm";
  
  // 根据颜色亮度判断目标度数（简化版）
  const brightness = (r + g + b) / 3;
  const targetLevel = Math.min(10, Math.max(1, Math.round(brightness / 25.5))); // 映射到1-10级
  
  return {
    targetLevel: targetLevel,
    targetReflect: targetReflect
  };
};



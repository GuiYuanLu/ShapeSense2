/*
 * @Description: 全局类型声明文件
 * 为 CSS 模块提供 TypeScript 类型支持
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

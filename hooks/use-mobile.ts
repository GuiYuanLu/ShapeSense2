/*
 * @Description: 
 * Ray版权所有
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved. 
 */
/*
 * @Description: 移动端检测 Hook
 * 检测当前设备是否为移动端
 * Ray版权所有
 * Copyright (c) 2026 by Ray, All Rights Reserved.
 */
import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

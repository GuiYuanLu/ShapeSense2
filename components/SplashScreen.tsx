'use client'

import * as React from 'react'
import { ScanLine } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SplashScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  onComplete?: () => void
}

export function SplashScreen({ className, onComplete, ...props }: SplashScreenProps) {
  const [opacity, setOpacity] = React.useState(0)

  React.useEffect(() => {
    const fadeInTimer = setTimeout(() => setOpacity(1), 100)
    const completeTimer = setTimeout(() => {
      setOpacity(0)
      setTimeout(() => onComplete?.(), 500)
    }, 2500)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      data-slot="splash-container"
      className={cn(
        'fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 transition-opacity duration-500',
        className
      )}
      style={{ opacity }}
      onClick={onComplete}
      {...props}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="relative flex items-center justify-center">
          <ScanLine className="h-24 w-24 text-purple-400" strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="mt-8 text-4xl font-bold tracking-wider text-white">SHAPE SENSE</h1>
      <p className="mt-2 text-sm text-purple-300">AI Neural Styling Lab</p>
    </div>
  )
}

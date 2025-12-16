import React, { useState, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '../lib/utils'

interface Ripple {
  x: number
  y: number
  id: number
}

interface RipplesButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const RipplesButton: React.FC<RipplesButtonProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = { x, y, id: Date.now() }
    setRipples((prev) => [...prev, newRipple])

    if (onClick !== undefined) {
      onClick(e)
    }
  }

  const handleAnimationComplete = (id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
  }

  return (
    <button
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-md border-2',
        'border-blue-500 px-6 py-3 font-bold text-blue-500 transition-colors',
        'hover:bg-blue-50 focus:ring-2 focus:ring-blue-500',
        'focus:ring-offset-2 focus:outline-none',
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => handleAnimationComplete(ripple.id)}
            className="pointer-events-none absolute rounded-full bg-blue-400"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50,
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}

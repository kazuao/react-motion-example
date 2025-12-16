import React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '../lib/utils'

interface ScaleButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode
  className?: string
}

export const ScaleButton: React.FC<ScaleButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-md border-2',
        'border-blue-500 px-6 py-3 font-bold text-blue-500 transition-colors',
        'hover:bg-blue-50',
        className,
      )}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

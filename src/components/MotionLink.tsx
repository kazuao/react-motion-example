import { Link, type LinkProps } from 'react-router-dom'
import {
  isValidMotionProp,
  motion,
  useAnimation,
  type MotionProps,
} from 'motion/react'
import { cn } from '../lib/utils'
import { forwardRef } from 'react'
import * as React from 'react'

// Linkコンポーネントをmotion化
type P = Omit<LinkProps, keyof MotionProps> & MotionProps

const LinkWithRef = forwardRef<HTMLAnchorElement, P>((props, ref) => {
  const linkProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
  ) as LinkProps

  return <Link ref={ref} {...linkProps} />
})

export const MotionRouterLink = motion.create(LinkWithRef, {
  forwardMotionProps: false, // motion.dev の仕様上、デフォルトでも filter されます :contentReference[oaicite:0]{index=0}
})

// ✅ ここが重要：LinkProps ではなく MotionRouterLink の props 型を使う
type MotionRouterLinkProps = React.ComponentPropsWithoutRef<
  typeof MotionRouterLink
>

type MotionLinkProps = Omit<
  MotionRouterLinkProps,
  'children' | 'className' | 'onClick'
> & {
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const MotionLink = ({
  children,
  className,
  onClick,
  ...props
}: MotionLinkProps) => {
  const controls = useAnimation()

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e)

    // 毎度リセットしている
    controls.set({ x: '-100%', y: '-40%' })
    controls.start({
      x: '100%',
      y: '40%',
      transition: { duration: 0.5, ease: 'easeInOut' },
    })
  }

  return (
    <MotionRouterLink
      {...props}
      onClick={handleClick}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden px-4 py-2 font-medium text-blue-600 transition-colors hover:opacity-80',
        className,
      )}
    >
      <motion.div
        className="absolute inset-0 bg-blue-200/50"
        initial={{ x: '-100%', y: '-100%' }}
        animate={controls}
      />
      <span className="relative z-10">{children}</span>
    </MotionRouterLink>
  )
}

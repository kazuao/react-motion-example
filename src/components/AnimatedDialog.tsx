import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { cn } from '../lib/utils'

interface AnimatedDialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export const AnimatedDialog = ({
  isOpen,
  onClose,
  children,
  className,
}: AnimatedDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // ダイアログの開閉を制御
  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen && dialog !== null && !dialog.open) {
      dialog.showModal()
    }
    // クリーンアップはAnimatePresenceに任せるのでここでは明示的にcloseしない
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.dialog
          ref={dialogRef}
          className={cn(
            'fixed inset-0 z-50 m-0 flex h-screen max-h-none w-screen max-w-none items-center justify-center bg-transparent p-0',
            'backdrop:bg-transparent backdrop:backdrop-blur-none', // ネイティブのbackdropを無効化
          )}
          onCancel={onClose}
        >
          {/* 自前バックドロップ */}
          <motion.div
            className="absolute inset-0 bg-gray-500/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* コンテンツ */}
          <motion.div
            className={cn(
              'relative z-10 rounded-xl p-8 shadow-2xl',
              'bg-white text-slate-900 dark:bg-slate-800 dark:text-white',
              className,
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: {
                duration: 0.2,
                type: 'tween',
                ease: 'easeInOut',
              },
            }}
            transition={{
              duration: 0.2,
              type: 'spring',
              stiffness: 500,
              damping: 50,
            }}
          >
            {children}
          </motion.div>
        </motion.dialog>
      ) : null}
    </AnimatePresence>
  )
}

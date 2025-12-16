import { AnimatePresence, motion } from 'motion/react'
import { useLayoutEffect } from 'react'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  // Sidebarが開いている間は、背景のスクロールを防止する
  useLayoutEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          {/* オーバーレイ (背景) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* サイドバー本体 */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl dark:bg-gray-800"
          >
            <div className="flex h-full flex-col p-6">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 space-y-4">
                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block rounded-lg px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="mt-auto border-t border-gray-200 pt-6 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © 2025 My App
                </p>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

export default Sidebar

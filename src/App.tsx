// import ScrollTriggered from './components/ScrollTriggered'
// import ScrollLinked from './components/ScrollLinked'
// import LayoutAnimation from './components/LayoutAnimation'
// import SharedLayoutAnimation from './components/SharedLayoutAnimation'
// import ExitAnimation from './components/ExitAnimation'
// import RotationBox from './components/RotationBox'
// import SpringBall from './components/SpringBall'
// import PagingIndicator from './components/PagingIndicator'
import Sidebar from './components/Sidebar'
import { useState } from 'react'
import { MotionLink } from './components/MotionLink'
import { RippleButton } from './components/RippleButton'
import { ScaleButton } from './components/ScaleButton'
import { AnimatedDialog } from './components/AnimatedDialog'

// https://ics.media/entry/251204/

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="fixed top-4 left-4 z-30 flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white shadow-lg transition-colors hover:bg-blue-700"
        >
          Open Menu
        </button>

        <button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-lg bg-purple-600 px-4 py-2 font-bold text-white shadow-lg transition-colors hover:bg-purple-700"
        >
          Open Dialog
        </button>

        <MotionLink to="/">Animated Link</MotionLink>
        <RippleButton>Click Ripples</RippleButton>
        <ScaleButton>Click Scaled</ScaleButton>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <AnimatedDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Hello!</h2>
          <p>
            This is an animated dialog using Framer Motion and HTML dialog
            element.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Close
            </button>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </AnimatedDialog>

      {/* <RotationBox /> */}
      {/* <SpringBall /> */}

      {/* type="dots" | "bar" | "fraction" | "none" */}
      {/* <PagingIndicator type="bar" /> */}

      {/* <ScrollTriggered /> */}
      {/* <ScrollLinked /> */}
      {/* <LayoutAnimation /> */}
      {/* <SharedLayoutAnimation /> */}
      {/* <ExitAnimation /> */}
    </>
  )
}

export default App

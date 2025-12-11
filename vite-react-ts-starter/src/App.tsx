import { useState } from 'react'
import { cn } from '@/lib/utils'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-900/5 sm:p-12 text-center">
        <h1 className={cn("text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl")}>
          Vite + React + Tailwind v4
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Ready to code! Configured with TypeScript, ESLint, Prettier, Husky, and utils.
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className={cn(
              "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors cursor-pointer",
              "hover:bg-indigo-500",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            )}
          >
            count is {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

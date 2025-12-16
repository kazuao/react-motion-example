import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  useMotionValueEvent,
} from 'motion/react'
import { useRef, useState } from 'react'

const pages = ['#ff0088', '#dd00ee', '#9911ff', '#0d63f8', '#00cc88']

export type IndicatorType = 'none' | 'dots' | 'bar' | 'fraction'

interface PagingIndicatorProps {
  type?: IndicatorType
}

export default function PagingIndicator({
  type = 'dots',
}: PagingIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
      }}
    >
      {/* カード */}
      <div
        style={{
          width: '600px',
          height: '400px',
          backgroundColor: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        }}
      >
        {/* スクロールコンテナ */}
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'scroll',
            overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            width: '100%',
            height: '100%',
            scrollbarWidth: 'none', // Firefox用
          }}
          className="no-scrollbar" // 必要に応じてCSSで ::-webkit-scrollbar { display: none; } を当てる
        >
          {pages.map((color, index) => (
            <Page key={index} index={index + 1} color={color} />
          ))}
        </div>

        {/* インジケーターエリア */}
        {type !== 'none' ? (
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              padding: '10px 20px',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '20px',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {type === 'dots' ? (
              <div style={{ display: 'flex', gap: '12px' }}>
                {pages.map((_, index) => (
                  <DotIndicator
                    key={index}
                    index={index}
                    total={pages.length}
                    scrollProgress={scrollXProgress}
                    onClick={() => {
                      if (containerRef.current != null) {
                        const target = containerRef.current.clientWidth * index
                        containerRef.current.scrollTo({
                          left: target,
                          behavior: 'smooth',
                        })
                      }
                    }}
                  />
                ))}
              </div>
            ) : null}

            {type === 'bar' ? (
              <BarIndicator scrollProgress={scrollXProgress} />
            ) : null}

            {type === 'fraction' ? (
              <FractionIndicator
                scrollProgress={scrollXProgress}
                total={pages.length}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const Page = ({ index, color }: { index: number; color: string }) => (
  <section
    style={{
      height: '100%',
      minWidth: '100%', // カードの幅に合わせる
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color,
      scrollSnapAlign: 'center',
    }}
  >
    <h1
      style={{
        fontSize: '80px',
        color: 'white',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        margin: 0,
      }}
    >
      {index}
    </h1>
  </section>
)

const DotIndicator = ({
  index,
  total,
  scrollProgress,
  onClick,
}: {
  index: number
  total: number
  scrollProgress: MotionValue<number>
  onClick: () => void
}) => {
  // 全体のスクロール進捗(0~1)を、ページ数に基づいて分割する
  const step = 1 / (total - 1)
  const targetValue = index * step

  // インジケーターが反応する範囲
  const rangeStart = targetValue - step / 2
  const rangeEnd = targetValue + step / 2

  // スクロール位置に応じてスケールを変化させる
  const scale = useTransform(
    scrollProgress,
    [rangeStart, targetValue, rangeEnd],
    [1, 1.5, 1],
  )

  // スクロール位置に応じて透明度を変化させる
  const opacity = useTransform(
    scrollProgress,
    [rangeStart, targetValue, rangeEnd],
    [0.5, 1, 0.5],
  )

  // スクロール位置に応じて色を変化させる
  const backgroundColor = useTransform(
    scrollProgress,
    [rangeStart, targetValue, rangeEnd],
    ['rgba(255, 255, 255, 0.5)', '#ffffff', 'rgba(255, 255, 255, 0.5)'],
  )

  return (
    <motion.button
      onClick={onClick}
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        backgroundColor,
        scale,
        opacity,
        outline: 'none',
      }}
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 0.9 }}
    />
  )
}

const BarIndicator = ({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>
}) => (
  <div
    style={{
      width: '100px',
      height: '4px',
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: '2px',
      overflow: 'hidden',
    }}
  >
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        scaleX: scrollProgress,
        originX: 0,
      }}
    />
  </div>
)

const FractionIndicator = ({
  scrollProgress,
  total,
}: {
  scrollProgress: MotionValue<number>
  total: number
}) => {
  const [current, setCurrent] = useState(1)

  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    const page = Math.round(latest * (total - 1)) + 1
    // 範囲外に出ないようにクランプ
    const clampedPage = Math.max(1, Math.min(page, total))
    if (clampedPage !== current) {
      setCurrent(clampedPage)
    }
  })

  return (
    <span
      style={{
        color: 'white',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: '14px',
      }}
    >
      {current} / {total}
    </span>
  )
}

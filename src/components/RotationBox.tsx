import { motion } from 'motion/react'

export default function RotationBox() {
  return (
    <motion.div
      style={box}
      animate={{ rotate: 360 }}
      transition={{ duration: 2 }}
    />
  )
}

const box = {
  width: 100,
  height: 100,
  backgroundColor: '#ff0088',
  borderRadius: 5,
}

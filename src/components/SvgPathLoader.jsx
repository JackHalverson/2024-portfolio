'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function SvgPathLoader({ onComplete }) {
  const controls = useAnimation()
  const [showGlassEffect, setShowGlassEffect] = useState(false)

  useEffect(() => {
    const animateLoader = async () => {
      await controls.start('visible')
      setShowGlassEffect(true)

      // Rest for 1 second before completing
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 2000)
    }

    animateLoader()
  }, [controls, onComplete])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111111',
        position: 'relative',
      }}
    >
      {/* First Animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={showGlassEffect ? { opacity: 0 } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{ position: 'absolute' }}
      >
        <svg
          width="264px"
          height="290px"
          viewBox="0 0 259.32 281"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.polygon
            points="185.69 0 185.69 125.28 142.65 125.28 142.65 43.03 17.21 43.03 17.21 0 185.69 0"
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={controls}
            variants={{
              visible: {
                pathLength: 1,
                pathOffset: 0,
                transition: { duration: 2, ease: 'easeInOut' },
              },
            }}
            stroke="#fff"
            fill="none"
            strokeWidth="6"
          />
          <motion.path
            d="M259.32,56.9v224.1h-43.03v-98.98h-32.67c-7.81,35.86-35.22,63.75-71.25,72.04v26.94h-43.03v-27.26c-31.72-7.65-57.38-31.24-67.74-62.32l-1.59-4.46,40.96-13.55,1.43,4.62c1.38,4.21,5.98,16.47,18.73,25.72,2.52,1.83,14.27,10.01,30.2,9.82,19.26-.22,37.35-12.6,47.34-31.56h-26.46v15.3h-43.03V57.22h43.03v81.77l103.92.32V57.22l43.19-.32Z"
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={controls}
            variants={{
              visible: {
                pathLength: 1,
                pathOffset: 0,
                transition: { duration: 2.5, ease: 'easeInOut' },
              },
            }}
            stroke="#fff"
            fill="none"
            strokeWidth="6"
          />
        </svg>
      </motion.div>

      {/* Glassmorphism SVG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showGlassEffect ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ position: 'absolute' }}
      >
        <svg
          width="264px"
          height="290px"
          viewBox="0 0 259.32 281"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="60.57"
              y1="-4.38"
              x2="202.02"
              y2="87.13"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <polygon
            fill="url(#linear-gradient)"
            points="185.69 0 185.69 125.28 142.65 125.28 142.65 43.03 17.21 43.03 17.21 0 185.69 0"
          />
          <path
            fill="url(#linear-gradient)"
            d="M259.32,56.9v224.1h-43.03v-98.98h-32.67c-7.81,35.86-35.22,63.75-71.25,72.04v26.94h-43.03v-27.26c-31.72-7.65-57.38-31.24-67.74-62.32L0,186.96l40.96-13.55,1.43,4.62c1.38,4.21,5.98,16.47,18.73,25.72,2.52,1.83,14.27,10.01,30.2,9.82,19.26-.22,37.35-12.6,47.34-31.56h-26.46v15.3h-43.03V57.22h43.03v81.77l103.92.32V57.22l43.19-.32Z"
          />
        </svg>
      </motion.div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import SvgPathLoader from '@/components/SvgPathLoader'
import AnimatedSvgPath from '@/components/AnimatedSvgPath'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'

// Load Scene dynamically with SSR disabled
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [SceneComponent, setSceneComponent] = useState(null)

  useEffect(() => {
    // Preload the Scene component dynamically
    const loadScene = async () => {
      const ImportedScene = await import('@/components/Scene')
      setSceneComponent(() => ImportedScene.default)
    }

    loadScene()

    // Simulate loading duration matching the animation length (approx. 3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <SvgPathLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && SceneComponent && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          {/* First Section: Scene */}
          <section>
            <SceneComponent />
          </section>

          {/* Second Section: Text and Animated SVG Path */}
          <section className='relative'>
            <div className='text-center'>
              <h1>About me</h1>
              <p>Explore my work and projects below</p>
            </div>
            <AnimatedSvgPath />
          </section>
        </motion.div>
      )}
    </main>
  )
}

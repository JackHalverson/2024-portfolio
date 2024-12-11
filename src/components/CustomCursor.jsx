'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './styles/customCursor.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [stickyPosition, setStickyPosition] = useState(null)

  // Track the mouse movement
  useEffect(() => {
    const moveCursor = (e) => {
      if (!stickyPosition) {
        setPosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [stickyPosition])

  // Handle hover elements
  useEffect(() => {
    const hoverElements = document.querySelectorAll('.cursor-hover')

    const handleMouseEnter = (e) => {
      setHovered(true)
      const rect = e.target.getBoundingClientRect()
      setStickyPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    }

    const handleMouseLeave = () => {
      setHovered(false)
      setStickyPosition(null)
    }

    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Debugging: Log the hover elements
    console.log('Hover Elements:', hoverElements)

    return () => {
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className={`custom-cursor ${hovered ? 'custom-cursor--hovered' : ''}`}
        initial={{ x: position.x, y: position.y }}
        animate={{ x: stickyPosition?.x ?? position.x, y: stickyPosition?.y ?? position.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </AnimatePresence>
  )
}

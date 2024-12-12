'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import '../styles/tilt.css'

// Register the GSAP plugin
gsap.registerPlugin(MotionPathPlugin)

export default function TiltHoverCard({ children }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current

    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      gsap.to(card, {
        duration: 0.6,
        rotationX: y * 25,
        rotationY: x * 25,
        ease: 'power1.out',
        transformPerspective: 1000,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.6,
        rotationX: 0,
        rotationY: 0,
        ease: 'power1.out',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="tilt-card" ref={cardRef}>
      <div className="tilt-content">{children}</div>
    </div>
  )
}

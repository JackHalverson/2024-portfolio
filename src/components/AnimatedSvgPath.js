// src/components/AnimatedSvgPath.js
"use client";
import { useEffect, useRef } from 'react'

export default function AnimatedSvgPath() {
  const svgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (svgRef.current) {
        const svg = svgRef.current
        const path = svg.querySelector('path')
        const distance = window.scrollY
        const totalDistance = document.documentElement.scrollHeight - window.innerHeight
        const percentage = distance / totalDistance
        const pathLength = path.getTotalLength()
        path.style.strokeDasharray = `${pathLength}`
        path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`
      }
    }

    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1366 2303">
      <path className="st0" d="M0,160.9c55.6,23.4,130.3,65.8,162.5,142.9,63.1,151.2-80.1,326.6-34.6,368.1s100.6-31.6,181.9-73.6c319.9-165.6,541.4-4,763.8-123.4s142.9-192.7,85-296.7c-72.9-130.8-341.1-150.4-466.1,30.3-199.2,288,450.1,542.2,379.5,658.3-72.5,119-743.6-233.4-844.5-82.3-41.6,62.2,22.7,196.3,108.3,277.2,270.4,255.6,760.3-13.8,853.2,142.9,73.1,123.4-149.7,426.3-402.8,584.7C461.2,1992.6,112.6,1940.9,0,1919.2"/>
    </svg>
  )
}

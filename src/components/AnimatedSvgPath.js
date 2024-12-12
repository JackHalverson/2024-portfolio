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
    <div className='svgPath'>
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1366 2400">
        <path className="st0" d="M215.7-30.2c-249,288-60.4,295.4-28.2,372.5,63.1,151.2-147.2,244.7-59.7,329.6,45.5,41.5,100.6-31.6,181.9-73.6,319.9-165.6,541.4-4,763.8-123.4,112.2-63.3,142.9-192.7,85-296.7-72.9-130.8-341.1-150.4-466.1,30.3-199.2,288,450.1,542.2,379.5,658.3-72.5,119-743.6-233.4-844.5-82.3-41.6,62.2,22.7,196.3,108.3,277.2,249.6,235.9,736.5-38,853.2,142.9,26.5,41,41,106.3,14.2,147-107.3,162.5-759.8-237.1-913.8-58.5-90.8,105.3,19.9,378.6,181.9,530.5,238.7,223.9,732.2,322.1,796.9,203.5,65-119.1,15.2-357.1-155.9-443.9-298.8-151.6-1055.3,326.6-1013.4,519.7,39,179.7,372,112.2,495.9,327,57.2,99.2,68.4,200.5,69.3,268.5"/>
      </svg>
    </div>
  
  )
}

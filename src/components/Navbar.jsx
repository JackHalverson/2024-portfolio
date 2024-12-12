'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className='navbar'>
      {/* Desktop Navigation */}
      <ul className='nav-links'>
        <li><a href='#home'>Home</a></li>
        <li><a href='#work'>Work</a></li>
        <li><a href='#contact'>Contact</a></li>
      </ul>

      {/* Mobile Menu Button */}
      <div className='menu-button' onClick={toggleMenu}>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='mobile-menu'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <ul>
              <li><a href='#home' onClick={toggleMenu}>Home</a></li>
              <li><a href='#work' onClick={toggleMenu}>Work</a></li>
              <li><a href='#contact' onClick={toggleMenu}>Contact</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

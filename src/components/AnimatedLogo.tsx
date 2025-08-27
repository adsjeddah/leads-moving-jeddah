"use client"

import React from 'react'
import { motion } from 'framer-motion'

export function AnimatedLogo() {
  return (
    <div className="relative w-32 sm:w-40 h-12 sm:h-14">
      <motion.div
        animate={{ x: [0, 10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-full h-full"
      >
        <svg
          viewBox="0 0 200 70"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}
        >
          <defs>
            {/* Gradient for 3D effect */}
            <linearGradient id="truckBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3730A3" />
            </linearGradient>
            
            <linearGradient id="truckCabin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
            
            <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4B5563" />
              <stop offset="50%" stopColor="#6B7280" />
              <stop offset="100%" stopColor="#1F2937" />
            </linearGradient>

            {/* 3D lighting effect */}
            <filter id="3dEffect">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
              <feOffset dx="1" dy="2" result="offsetblur"/>
              <feFlood floodColor="#000000" floodOpacity="0.3"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Truck Body (cargo area) */}
          <g filter="url(#3dEffect)">
            {/* Main cargo box */}
            <rect
              x="45"
              y="15"
              width="85"
              height="35"
              rx="3"
              fill="url(#truckBody)"
            />
            
            {/* Cargo box highlight for 3D effect */}
            <rect
              x="48"
              y="18"
              width="79"
              height="3"
              fill="rgba(255,255,255,0.3)"
              rx="1"
            />
            
            {/* Cargo lines for detail */}
            <line x1="70" y1="15" x2="70" y2="50" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
            <line x1="95" y1="15" x2="95" y2="50" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
            
            {/* Moving boxes inside (visible through window) */}
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <rect x="55" y="25" width="15" height="15" fill="#EC4899" opacity="0.6" rx="2"/>
              <rect x="75" y="30" width="12" height="12" fill="#F59E0B" opacity="0.6" rx="2"/>
              <rect x="90" y="28" width="14" height="14" fill="#10B981" opacity="0.6" rx="2"/>
            </motion.g>
          </g>

          {/* Truck Cabin */}
          <g filter="url(#3dEffect)">
            <path
              d="M 130 25 L 145 25 Q 155 25 155 35 L 155 50 L 130 50 Z"
              fill="url(#truckCabin)"
            />
            
            {/* Window */}
            <rect
              x="134"
              y="30"
              width="17"
              height="12"
              fill="#60A5FA"
              opacity="0.6"
              rx="2"
            />
            
            {/* Window shine */}
            <path
              d="M 134 30 L 145 30 L 134 38 Z"
              fill="rgba(255,255,255,0.3)"
            />
            
            {/* Door handle */}
            <rect x="147" y="38" width="4" height="1" fill="#374151" rx="0.5"/>
          </g>

          {/* Front Wheel */}
          <g transform="translate(65, 50)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <circle
                r="8"
                fill="url(#wheelGradient)"
                filter="url(#3dEffect)"
              />
              {/* Wheel spokes */}
              <g stroke="#9CA3AF" strokeWidth="1" opacity="0.6">
                <line x1="0" y1="-6" x2="0" y2="6"/>
                <line x1="-6" y1="0" x2="6" y2="0"/>
                <line x1="-4" y1="-4" x2="4" y2="4"/>
                <line x1="-4" y1="4" x2="4" y2="-4"/>
              </g>
              {/* Wheel center */}
              <circle r="2" fill="#1F2937"/>
            </motion.g>
          </g>

          {/* Middle Wheel */}
          <g transform="translate(105, 50)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <circle
                r="8"
                fill="url(#wheelGradient)"
                filter="url(#3dEffect)"
              />
              {/* Wheel spokes */}
              <g stroke="#9CA3AF" strokeWidth="1" opacity="0.6">
                <line x1="0" y1="-6" x2="0" y2="6"/>
                <line x1="-6" y1="0" x2="6" y2="0"/>
                <line x1="-4" y1="-4" x2="4" y2="4"/>
                <line x1="-4" y1="4" x2="4" y2="-4"/>
              </g>
              {/* Wheel center */}
              <circle r="2" fill="#1F2937"/>
            </motion.g>
          </g>

          {/* Rear Wheel */}
          <g transform="translate(145, 50)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <circle
                r="8"
                fill="url(#wheelGradient)"
                filter="url(#3dEffect)"
              />
              {/* Wheel spokes */}
              <g stroke="#9CA3AF" strokeWidth="1" opacity="0.6">
                <line x1="0" y1="-6" x2="0" y2="6"/>
                <line x1="-6" y1="0" x2="6" y2="0"/>
                <line x1="-4" y1="-4" x2="4" y2="4"/>
                <line x1="-4" y1="4" x2="4" y2="-4"/>
              </g>
              {/* Wheel center */}
              <circle r="2" fill="#1F2937"/>
            </motion.g>
          </g>

          {/* Speed lines */}
          <motion.g
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <rect x="15" y="28" width="20" height="1" fill="#60A5FA" opacity="0.6" rx="0.5"/>
            <rect x="10" y="35" width="25" height="1" fill="#A78BFA" opacity="0.5" rx="0.5"/>
            <rect x="20" y="42" width="15" height="1" fill="#EC4899" opacity="0.4" rx="0.5"/>
          </motion.g>

          {/* Dust particles */}
          <motion.g
            animate={{ x: [-10, -40], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <circle cx="160" cy="52" r="2" fill="#D1D5DB" />
            <circle cx="165" cy="55" r="1.5" fill="#E5E7EB" />
            <circle cx="162" cy="58" r="1" fill="#F3F4F6" />
          </motion.g>
        </svg>
      </motion.div>
      
      {/* Brand text with 3D effect */}
      <motion.div
        className="absolute -bottom-2 right-0 text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          letterSpacing: '0.05em'
        }}
      >
        PROKR
      </motion.div>
    </div>
  )
}
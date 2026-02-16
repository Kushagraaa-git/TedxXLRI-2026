import React from 'react';
import { motion } from 'framer-motion';

const TopographicBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none select-none z-0">
      <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <motion.path
          d="M0,500 Q250,400 500,500 T1000,500 V1000 H0 Z"
          fill="none"
          stroke="#E62B1E"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        {[...Array(10)].map((_, i) => (
           <motion.path
             key={i}
             d={`M0,${100 * i} C300,${100 * i + 50} 700,${100 * i - 50} 1000,${100 * i}`}
             fill="none"
             stroke={i % 2 === 0 ? "#E62B1E" : "#333"}
             strokeWidth="1.5"
             initial={{ pathLength: 0 }}
             animate={{ 
               pathLength: 1,
               d: [
                 `M0,${100 * i} C300,${100 * i + 50} 700,${100 * i - 50} 1000,${100 * i}`,
                 `M0,${100 * i} C300,${100 * i - 50} 700,${100 * i + 50} 1000,${100 * i}`,
                 `M0,${100 * i} C300,${100 * i + 50} 700,${100 * i - 50} 1000,${100 * i}`
               ] 
             }}
             transition={{ 
               duration: 10 + i, 
               repeat: Infinity, 
               ease: "linear",
               delay: i * 0.2
             }}
           />
        ))}
        {/* Abstract Head Motif Elements */}
        <motion.circle 
          cx="800" cy="300" r="100" 
          stroke="#E62B1E" strokeWidth="1" fill="none"
          strokeDasharray="10 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
         <motion.circle 
          cx="800" cy="300" r="120" 
          stroke="#333" strokeWidth="1" fill="none"
          strokeDasharray="2 10"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  );
};

export default TopographicBackground;
import React from 'react';
import { motion } from 'framer-motion';
import TopographicBackground from './TopographicBackground';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      <TopographicBackground />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-tedRed font-bold tracking-widest text-sm md:text-base mb-4 uppercase">
            Edition '26 | 20th February | 12:00 P.M.
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none mb-6">
            BLURRING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 blur-[1px]">LINES</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Where definitions fade and innovation begins. Join us for a day of transformative ideas at XLRI Delhi.
          </p>
          
          <motion.a
            href="#tickets"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-tedRed text-white font-bold text-lg rounded-full hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(230,43,30,0.5)]"
          >
            Buy Tickets <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-0.5 h-16 bg-gradient-to-b from-white to-transparent opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;
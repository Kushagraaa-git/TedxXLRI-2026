import React from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-black text-white tracking-tighter mb-2">
              TEDx<span className="text-tedRed">XLRI</span>Delhi
            </h2>
            <p className="text-gray-500 text-sm">
              © 2026 TEDx XLRI Delhi. This independent TEDx event is operated under license from TED.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-tedRed transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-tedRed transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-tedRed transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="mailto:contact@tedxxlri.com" className="text-gray-400 hover:text-tedRed transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-zinc-900 text-center text-xs text-gray-600">
             <p>Designed with <span className="text-tedRed">♥</span> for the community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
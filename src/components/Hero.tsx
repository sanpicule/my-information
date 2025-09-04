import { Github, Twitter, Instagram, Mail, ArrowDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  contact: {
    github?: string;
    twitter?: string;
    email: string;
  };
}

const Hero = ({ contact }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      
      video.addEventListener('loadeddata', () => {
        video.play().catch(error => {
          console.error('動画の再生に失敗しました:', error);
        });
      });

      video.addEventListener('error', (e) => {
        console.error('動画の読み込みエラー:', e);
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 w-full relative overflow-hidden bg-slate-50">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        style={{ minHeight: '100vh' }}
      >
        <source src="/videos/hero.mov" type="video/quicktime" />
        <source src="/videos/hero.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Simple Background */}
      <div className="absolute inset-0 bg-slate-50 z-[-1]" />

      {/* Content */}
      <motion.div 
        className="w-full text-center px-4 sm:px-6 lg:px-8 relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {/* Portfolio Title */}
          <motion.div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans text-slate-900 mb-6 tracking-wide font-light">
            Hikawa's Portfolio
            </h1>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-slate-900 max-w-3xl mx-auto font-light leading-relaxed font-sans"
              style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
            >
              技術的な美しさと実用性のバランスを重視した<br />
              フロントエンド開発者のポートフォリオ
            </motion.p>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-6 mt-16"
          >
            {contact.github && (
              <motion.a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
              </motion.a>
            )}
            
            {contact.twitter && (
              <motion.a
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={20} />
              </motion.a>
            )}
            
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={20} />
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-20"
          >
            <motion.div
              className="inline-flex flex-col items-center text-slate-900 transition-colors duration-300 cursor-pointer"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span 
                className="text-sm font-medium mb-2 tracking-wider font-sans"
                style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
              >
                SCROLL
              </span>
              <ArrowDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

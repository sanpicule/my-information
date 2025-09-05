import { Github, Twitter, Instagram, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  name: string;
  introduction: string;
  contact: {
    github?: string;
    twitter?: string;
    email: string;
  };
}

const Hero = ({ name, introduction, contact }: HeroProps) => {
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
    <section id="home" className="h-dvh flex items-center justify-center w-full relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 z-0" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-slate-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-slate-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-slate-100 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-slate-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

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
              {name}'s Portfolio
            </h1>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-slate-900 max-w-3xl mx-auto font-light leading-relaxed font-sans"
              style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
            >
              {introduction}
            </motion.p>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-6 mt-4 md:mt-16"
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
            className="mt-12"
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

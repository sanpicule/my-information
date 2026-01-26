import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  name: string;
  introduction: string;
  contact: {
    github?: string;
    twitter?: string;
    email: string;
  };
}

const Hero = ({ introduction }: HeroProps) => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const blur = useTransform(scrollY, [0, 300], [0, 2]);

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

  const firstLine = "HIKAWA";
  const secondLine = "SANSHIRO";
  const totalChars = firstLine.length + secondLine.length;
  const delays = Array.from({ length: totalChars }, () => Math.random() * 2);

  return (
    <section id="home" className="h-dvh flex items-center justify-center w-full relative overflow-hidden">
      {/* Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ scale, filter: `blur(${blur}px)` }}>
        {/* Animated Grid Background */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* PC Background */}
        <div className="hidden md:block w-full h-full">
          <img
            src="/images/first_view_pc.png"
            alt="Background PC"
            className="w-full h-full object-cover"
          />
        </div>
        {/* SP Background */}
        <div className="block md:hidden w-full h-full">
          <img
            src="/images/first_view_sp.png"
            alt="Background SP"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="w-full px-4 sm:px-6 lg:px-8 relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          {/* Portfolio Title */}
          <motion.div>
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-wide font-black">
              <motion.div className="flex flex-col md:flex-row md:items-center md:justify-center">
                <motion.div className="flex">
                  {firstLine.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0.5, 1],
                        textShadow: ["0 0 0px #fff", "0 0 10px #fff", "0 0 0px #fff"]
                      }}
                      transition={{
                        duration: 1,
                        delay: delays[index],
                        times: [0, 0.3, 0.6, 1]
                      }}
                      className="inline-block text-white"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div className="flex">
                  {secondLine.split("").map((char, index) => (
                    <motion.span
                      key={index + firstLine.length}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0.5, 1],
                        textShadow: ["0 0 0px #fff", "0 0 10px #fff", "0 0 0px #fff"]
                      }}
                      transition={{
                        duration: 1,
                        delay: delays[index + firstLine.length],
                        times: [0, 0.3, 0.6, 1]
                      }}
                      className="inline-block text-white"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </h1>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto font-light leading-relaxed font-sans mt-6"
              style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              {introduction}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator at Bottom */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          className="inline-flex flex-col items-center text-white transition-colors duration-300 cursor-pointer"
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
    </section>
  );
};

export default Hero;

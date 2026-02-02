import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  name: string;
  introduction: string;
}

const Hero = ({ name, introduction }: HeroProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10,
      },
    },
  };

  return (
    <section id="home" className="h-dvh flex items-center justify-center w-full relative overflow-hidden bg-[url('/images/first_view_pc.png')] bg-cover bg-center">
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/70 z-10" /> */}

      {/* Content */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="flex flex-wrap items-center text-5xl font-black tracking-widest text-dark sm:text-6xl md:text-7xl lg:text-8xl">
            {Array.from("Sanshiro").map((letter, index) => (
              <motion.span
                key={`first-${index}`}
                initial={{ opacity: 0, scale: 0.5, x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400, rotate: (Math.random() - 0.5) * 360 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.2 + Math.random() * 0.8,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <div className="w-full h-0 md:hidden" />
            {Array.from("Hikawa").map((letter, index) => (
              <motion.span
                key={`last-${index}`}
                initial={{ opacity: 0, scale: 0.5, x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400, rotate: (Math.random() - 0.5) * 360 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.2 + Math.random() * 0.8,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-4 max-w-2xl text-left text-lg text-gray-700 sm:text-xl"
            variants={itemVariants}
          >
            {introduction}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator at Bottom */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="inline-flex flex-col items-center text-gray-700 transition-colors duration-300 cursor-pointer md:hover:text-primary"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-sm font-medium tracking-widest">
            SCROLL
          </span>
          <ArrowDown size={20} className="mt-1" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

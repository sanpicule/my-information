import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsHoverable } from '../hooks/useIsHoverable';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

const HamburguerIcon = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const isHoverable = useIsHoverable();
  const buttonHover = isHoverable ? { scale: 1.1 } : {};

  const lineVariants = {
    closed: (custom: number) => ({ rotate: 0, y: custom * 7 }),
    open: (custom: number) => ({ rotate: custom * 45, y: 0 })
  };

  return (
    <motion.button
      onClick={toggle}
      className="w-8 h-8 relative z-50"
      whileHover={buttonHover}
      whileTap={{ scale: 0.9 }}
      animate={isOpen ? "open" : "closed"}
    >
      <motion.div custom={1} variants={lineVariants} className="absolute h-1 w-7 rounded-md bg-gray-500 top-1/2 -translate-y-1/2" />
      <motion.div custom={-1} variants={lineVariants} className="absolute h-1 w-7 rounded-md bg-gray-500 top-1/2 -translate-y-1/2" />
    </motion.button>
  );
};

const MobileMenu = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const panelVariants = {
    hidden: { x: '100%', transition: { type: 'tween' as const, ease: 'easeIn' as const } },
    visible: { x: 0, transition: { type: 'tween' as const, ease: 'easeOut' as const } }
  };
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-white/90 backdrop-blur-md md:hidden"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.nav 
            className="h-full flex flex-col items-center justify-center gap-8"
            variants={listVariants}
          >
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={toggle}
                className="text-4xl font-bold text-gray-700 hover:text-dark transition-colors"
                variants={itemVariants}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = navItems.map(item => document.getElementById(item.href.substring(1)));
      let currentSection = 'Home';
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top < window.innerHeight / 2) {
          currentSection = section.id.charAt(0).toUpperCase() + section.id.slice(1);
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-0">
        <div className={`container-max transition-all duration-300
          ${isScrolled ? 'md:mt-2 md:bg-white/80 md:backdrop-blur-lg md:shadow-lg md:rounded-2xl' : ''}
        `}>
          <div className="flex items-center justify-between h-16 px-4">
            <a href="#home" className="flex items-center gap-2">
              <motion.img 
                src="/icon.png" 
                alt="Logo" 
                className="h-8 w-8 rounded-md hidden md:block"
              />
            </a>

            <nav className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-600 hover:text-dark' : 'text-gray-800 hover:text-black'}`}>
                  {item.name}
                  {activeSection === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark"
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </a>
              ))}
            </nav>
            
            <div className="md:hidden">
              <HamburguerIcon isOpen={isMenuOpen} toggle={toggleMenu} />
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} toggle={toggleMenu} />
    </>
  );
};

export default Header;
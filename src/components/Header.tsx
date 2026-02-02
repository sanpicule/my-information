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

  const topVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 7 }
  };
  const centerVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };
  const bottomVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -7 }
  };

  return (
    <motion.button
      onClick={toggle}
      className="w-8 h-8 relative"
      whileHover={buttonHover}
      whileTap={{ scale: 0.9 }}
      animate={isOpen ? "open" : "closed"}
    >
      <motion.div className="absolute h-0.5 w-7 bg-light" variants={topVariants} style={{ top: 8 }} />
      <motion.div className="absolute h-0.5 w-7 bg-light" variants={centerVariants} style={{ top: '50%', marginTop: '-1px' }}/>
      <motion.div className="absolute h-0.5 w-7 bg-light" variants={bottomVariants} style={{ bottom: 8 }} />
    </motion.button>
  );
};

const MobileMenu = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const panelVariants = {
    hidden: { x: '100%', transition: { type: 'tween', ease: 'easeIn' } },
    visible: { x: 0, transition: { type: 'tween', ease: 'easeOut' } }
  };
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-dark/90 backdrop-blur-md"
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
                className="text-4xl font-bold text-accent hover:text-primary transition-colors"
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  // Scroll detection for header style
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'pt-2' : 'pt-4'
      }`}>
        <div className={`container-max transition-all duration-300
          ${isScrolled ? 'rounded-2xl bg-white/5 backdrop-blur-lg shadow-lg shadow-black/20' : ''}
        `}>
          <div className="flex items-center justify-between h-16 px-4">
            <a href="#home" className="flex items-center gap-2">
              <motion.img 
                src="/icon.png" 
                alt="Logo" 
                className="h-8 w-8 rounded-md"
              />
            </a>

            <nav className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="relative px-3 py-2 text-sm font-medium text-accent md:hover:text-light transition-colors duration-300">
                  {item.name}
                  {activeSection === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
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
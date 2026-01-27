import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY < 10;
      setIsAtTop(atTop);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isMenuOpen || !isAtTop ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex space-x-3 ml-auto">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`py-2 px-4 ${isAtTop ? 'text-white' : 'text-slate-800'} transition-all duration-300 relative hover:opacity-40`}
                style={{ animationDelay: `${index * 100}ms` }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <motion.button
            onClick={toggleMenu}
            className={`md:hidden p-2 text-slate-700 hover:text-slate-900 transition-all duration-300 hover:scale-110 hover:rotate-180 ml-auto ${isAtTop &&!isMenuOpen ? 'text-white' : 'text-slate-700'}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* モバイルナビゲーション */}
      <div 
        className={`md:hidden fixed inset-0 top-16 bg-white transform transition-transform duration-400 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          height: 'calc(100vh - 4rem)'
        }}
      >
        <nav className="px-4 py-8 space-y-4">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className="block text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-lg py-1 px-4"
                            style={{
                              opacity: isMenuOpen ? 1 : 0,
                              transform: isMenuOpen ? 'translateY(0)' : 'translateY(-15px)',
                              transition: isMenuOpen
                                ? `opacity 0.3s ease-out ${0.2 + index * 0.05}s, transform 0.3s ease-out ${0.2 + index * 0.05}s`
                                : `opacity 0.15s ease-in ${(navItems.length - 1 - index) * 0.04}s, transform 0.15s ease-in ${(navItems.length - 1 - index) * 0.04}s`
                            }}            >
              <span className="relative z-10 text-2xl">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
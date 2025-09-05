import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Works', href: '#works' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  const closeMenu = () => {
    setIsClosing(true);
    // 文字が消えるのを待ってから背景をスライドアウト
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300); // 文字のアニメーション完了後
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
          <nav className="hidden md:flex space-x-8 ml-auto">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-slate-900 transition-all duration-300 relative hover:opacity-30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 transition-all duration-300 hover:scale-110 hover:rotate-180 ml-auto"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* モバイルナビゲーション */}
      <div 
        className={`md:hidden fixed inset-0 top-16 bg-white transform transition-transform duration-400 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          height: 'calc(100vh - 4rem)',
          transitionDelay: isClosing ? '0.3s' : '0s' // 閉じる時は文字が消えてから背景をスライド
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
                opacity: (isMenuOpen && !isClosing) ? 1 : 0,
                transform: (isMenuOpen && !isClosing) ? 'translateY(0)' : 'translateY(-15px)',
                transition: (isMenuOpen && !isClosing)
                  ? `opacity 0.3s ease-out ${0.2 + index * 0.05}s, transform 0.3s ease-out ${0.2 + index * 0.05}s`
                  : `opacity 0.15s ease-in ${(navItems.length - 1 - index) * 0.04}s, transform 0.15s ease-in ${(navItems.length - 1 - index) * 0.04}s`
              }}
            >
              <span className="relative z-10 text-2xl">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
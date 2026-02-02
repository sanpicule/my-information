import { motion } from 'framer-motion';
import { Mail, Twitter, Instagram, Github, ArrowUp } from 'lucide-react';
import { profileData } from '@/lib/data';
import { useIsHoverable } from '../hooks/useIsHoverable';

interface FooterProps {
  contact: {
    github?: string;
    twitter?: string;
    email: string;
    instagram?: string;
  };
}

const Footer = ({ contact }: FooterProps) => {
  const isHoverable = useIsHoverable();
  const currentYear = new Date().getFullYear();

  const navItems = ['Home', 'About', 'Skills', 'Portfolio', 'Contact'];
  const socialLinks = [
    { icon: Github, href: profileData.contact.github, name: 'GitHub' },
    { icon: Twitter, href: profileData.contact.twitter, name: 'Twitter' },
    { icon: Instagram, href: profileData.contact.instagram, name: 'Instagram' },
    { icon: Mail, href: `mailto:${profileData.contact.email}`, name: 'Email' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const socialLinkHover = isHoverable ? { scale: 1.1, y: -5, boxShadow: '0px 10px 20px rgba(56, 189, 248, 0.2)' } : {};
  const scrollToTopHover = isHoverable ? { scale: 1.1, backgroundColor: 'rgb(56 189 248)' } : {};

  return (
    <footer className="relative bg-dark pt-20 pb-10 overflow-hidden hidden md:block">
      {/* Gradient border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-accent" />
      
      <motion.div 
        className="container-max text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Logo */}
        <motion.a href="#home" className="inline-block mb-8" variants={itemVariants}>
          <img src="/icon.png" alt="Logo" className="h-12 w-12 mx-auto rounded-md" />
        </motion.a>

        {/* Quick Links */}
        <motion.nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8" variants={itemVariants}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-accent md:hover:text-light md:hover:underline underline-offset-4 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </motion.nav>

        {/* Social Links */}
        <motion.div className="flex justify-center space-x-4 mb-10" variants={itemVariants}>
          {socialLinks.map(({ icon: Icon, href, name }) => (
            href && (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-accent md:hover:text-primary transition-all duration-300"
                whileHover={socialLinkHover}
                whileTap={{ scale: 0.95 }}
                title={name}
              >
                <Icon size={22} />
              </motion.a>
            )
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.p className="text-accent text-sm" variants={itemVariants}>
          © {currentYear} MyPortfolio. All Rights Reserved.
        </motion.p>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center text-light shadow-lg shadow-primary/30"
        whileHover={scrollToTopHover}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        title="Scroll to top"
      >
        <ArrowUp size={24} />
      </motion.button>
    </footer>
  );
};

export default Footer;

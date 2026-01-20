import { motion } from 'framer-motion';
import { Mail, Twitter, Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  contact: {
    github?: string;
    twitter?: string;
    email: string;
    instagram?: string;
  };
}

const Footer = ({ contact }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white px-12">
      <motion.div 
        className="container-max py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div>
            <h3 className="text-2xl font-sans font-light mb-4">Hikawa's Portfolio</h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed mb-6 max-w-md">
              フロントエンド開発者として、技術的な美しさと実用性のバランスを重視した開発を心がけています。
              ユーザー体験を最優先に考え、高品質なWebアプリケーションの開発に取り組んでいます。
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
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
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div>
            <h4 className="text-lg font-medium mb-4">クイックリンク</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Works', 'Contact'].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-300 hover:text-white transition-colors duration-300 font-light"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div>
            <h4 className="text-lg font-medium mb-4">お問い合わせ</h4>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-3 text-slate-300"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <a 
                  href={`mailto:${contact.email}`}
                  className="font-light hover:text-white transition-colors duration-300"
                >
                  {contact.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-slate-400 font-light text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          
          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;

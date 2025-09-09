import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Twitter, Instagram } from 'lucide-react';
import ContactForm from './ContactForm';
import { ContactInfo } from '../types';

interface ContactProps {
  contact: ContactInfo;
}

const Contact = ({ contact }: ContactProps) => {
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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    },
    hover: {
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-sans font-light text-slate-900 mb-6">
            Contact
          </h2>
          
          <motion.p 
            className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
            variants={itemVariants}
          >
            新しいプロジェクトのご相談や、お問い合わせがございましたら、
            お気軽にご連絡ください。迅速にご返信いたします。
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="p-6 bg-slate-50 border border-slate-200 rounded-xl mb-6"
              variants={cardVariants}
            >
              <h3 className="text-xl font-sans font-light text-slate-900 mb-6">
                連絡先情報
              </h3>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-light">メールアドレス</p>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="font-medium text-slate-900 hover:text-slate-700 transition-colors duration-300"
                    >
                      {contact.email}
                    </a>
                  </div>
                </motion.div>
                
                {contact.phone && (
                  <motion.div 
                    className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-light">電話番号</p>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="font-medium text-slate-900 hover:text-slate-700 transition-colors duration-300"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </motion.div>
                )}
                
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-light">所在地</p>
                    <span className="font-medium text-slate-900">東京都世田谷区</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="p-6 bg-slate-50 border border-slate-200 rounded-xl"
              variants={cardVariants}
            >
              <h4 className="text-lg font-sans font-light text-slate-900 mb-4">
                SNSで連絡する
              </h4>
              
              <div className="flex space-x-4">
                {contact.github && (
                  <motion.a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white border border-slate-700 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} color="black" />
                  </motion.a>
                )}
                
                {contact.twitter && (
                  <motion.a
                    href={contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white border border-slate-700 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter size={20} color="black" />
                  </motion.a>
                )}
                
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border border-slate-700 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={20} color="black" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Under Development */}
          <motion.div variants={itemVariants} className="relative">
            {/* Contact Form with reduced opacity */}
            <div className="opacity-40 pointer-events-none">
              <ContactForm />
            </div>
            
            {/* Black Overlay */}
            <div className="absolute inset-0 z-10 bg-black/60 rounded-xl"></div>
            
            {/* Development Notice Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl px-6 py-4 shadow-lg">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-800 text-sm font-medium">開発中です。SNSで連絡して下さい。</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

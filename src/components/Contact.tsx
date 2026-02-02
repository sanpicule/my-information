import { motion } from 'framer-motion';
import { Twitter, Instagram } from 'lucide-react';
import ContactForm from './ContactForm';
import { ContactInfo } from '../types';
import { useIsHoverable } from '../hooks/useIsHoverable';

interface ContactProps {
  contact: ContactInfo;
}

const Contact = ({ contact }: ContactProps) => {
  const isHoverable = useIsHoverable();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const socialLinkHover = isHoverable ? { scale: 1.1, y: -2, boxShadow: "0px 10px 20px rgba(56, 189, 248, 0.3)" } : {};

  return (
    <section id="contact" className="section-padding">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tighter mb-4">
            Contact
          </h2>
          <p className="text-base text-accent max-w-2xl">
            新しいプロジェクトのご相談や、お問い合わせがございましたら、
            お気軽にご連絡ください。
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div variants={containerVariants}>
              <motion.h3 variants={itemVariants} className="text-2xl font-bold text-light mb-2">
                SNS
              </motion.h3>
              <motion.p variants={itemVariants} className="text-accent mb-6">
                下記のフォームまたはSNSからご連絡ください。
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex space-x-4">
                {contact.twitter && (
                  <motion.a
                    href={contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-dark border border-accent/30 rounded-full flex items-center justify-center"
                    whileHover={socialLinkHover}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter size={20} className="text-light" />
                  </motion.a>
                )}
                
                <motion.a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-dark border border-accent/30 rounded-full flex items-center justify-center"
                  whileHover={socialLinkHover}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={20} className="text-light" />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;

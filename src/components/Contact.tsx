import { motion } from 'framer-motion';
import { Twitter, Instagram } from 'lucide-react';
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
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-slate-900 mb-6">
            Contact
          </h2>
          
          <motion.p 
            className="text-sm sm:text-base text-slate-800 font-light leading-relaxed"
            variants={itemVariants}
          >
            新しいプロジェクトのご相談や、お問い合わせがございましたら、
            お気軽にご連絡ください。迅速にご返信いたします。
          </motion.p>
        </motion.div>

        <div className="grid gap-12 items-start">
          {/* Contact Information */}
          <motion.div variants={itemVariants}>

            {/* Social Links */}
            <motion.div
              variants={cardVariants}
            >
              <h4 className="text-lg font-sans font-light text-slate-900 mb-4">
                SNSで連絡する
              </h4>
              
              <div className="flex space-x-4">
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
                  href={contact.instagram}
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

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

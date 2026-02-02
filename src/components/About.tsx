import { motion } from 'framer-motion';
import { useIsHoverable } from '../hooks/useIsHoverable';
import { Briefcase, GraduationCap, Github, FileText, Rss } from 'lucide-react';
import { profileData } from '@/lib/data';

interface AboutProps {
  about: typeof profileData.about;
}

const About = ({ about }: AboutProps) => {
  const isHoverable = useIsHoverable();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const socialLinks = [
    { name: 'GitHub', href: profileData.contact.github, icon: Github },
    { name: 'Zenn', href: 'https://zenn.dev/sanpi34', icon: Rss },
    { name: 'Skill Sheet', href: 'https://sanpicule.github.io/my-information/skill-sheet.pdf', icon: FileText }
  ];

  const linkHover = isHoverable ? { y: -2, color: '#0ea5e9' } : {};

  // タイムライン用のアイコンを決定するヘルパー
  const getTimelineIcon = (item: typeof about.workHistory[0]) => {
    if (item.position.includes('エンジニア') || item.position.includes('開発')) {
      return <Briefcase className="w-5 h-5 text-light" />;
    }
    return <GraduationCap className="w-5 h-5 text-light" />;
  };

  return (
    <section id="about" className="section-padding overflow-hidden">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-light tracking-tighter">About</h2>
          <p className="mt-2 text-base text-accent max-w-2xl">私のこれまでの経歴や、エンジニアに至った経緯を記載しています。</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-x-12 gap-y-16">
          {/* Left Column: Profile Card */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="sticky top-28 grid gap-8">
              <div className="flex items-center gap-4"> {/* glass-card削除、横並び */}
                <motion.img
                  src="/images/profile.jpg"
                  alt="Profile Picture"
                  className="w-24 h-24 rounded-full border-2 border-primary/50 object-cover shadow-lg" // サイズ調整、mx-auto, mb-6削除
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
                />
                <div> {/* 名前と役職のコンテナ */}
                  <h3 className="text-2xl font-bold text-white">{profileData.name}</h3>
                  <p className="text-sky-600 font-semibold mt-1">{profileData.title}</p>
                </div>
              </div>
              <div> {/* SNSリンクのカードはそのまま */}
                <h4 className="font-semibold text-white mb-4">Find me on</h4>
                <div className="flex gap-8">
                  {socialLinks.map(link => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white flex flex-col items-center gap-2 text-xs"
                      whileHover={linkHover}
                    >
                      <link.icon className="w-6 h-6" />
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Main Content */}
          <motion.div className="lg:col-span-2" variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-2xl font-bold text-light mb-4">Who I Am</h3>
              <p className="text-accent leading-relaxed whitespace-pre-line">
                {about.description}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-light mb-8">Career & Education</h3>
              <div className="relative border-l-2 border-accent/20 pl-8 space-y-12">
                {about.workHistory.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -left-[43px] top-1 w-8 h-8 rounded-full bg-dark border-2 border-accent/20 flex items-center justify-center">
                      {getTimelineIcon(item)}
                    </div>
                    <p className="text-sm text-primary font-semibold mb-1">{item.period}</p>
                    <h4 className="font-bold text-light text-xl">{item.company}</h4>
                    <p className="text-light/80 mb-2">{item.position}</p>
                    <p className="text-accent text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

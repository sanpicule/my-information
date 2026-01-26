import { motion } from 'framer-motion';

interface AboutData {
  description: string;
  workHistory: {
    company: string;
    period: string;
    position: string;
    description: string;
  }[];
  education: {
    school: string;
    period: string;
    degree: string;
    description: string;
  }[];
  achievements: {
    title: string;
    year: string;
    description: string;
  }[];
}

interface Skill {
  name: string;
  level: string;
  category: string;
}

interface AboutProps {
  about: AboutData;
  skills: Skill[];
}

const About = ({ about }: AboutProps) => {
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
    }
  };

  return (
    <section id="about" className="section-padding bg-slate-50">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-slate-900 mb-12">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-12 items-start">
          {/* Personal Info */}
          <motion.div variants={itemVariants}>
            <motion.div
              variants={cardVariants}
            >
              <div className="relative z-10">
                <div className="flex flex-col gap-12">
                  <div>
                    <motion.div 
                      className="text-slate-800"
                      variants={itemVariants}
                    >
                      <h3 className="text-2xl font-sans font-light text-slate-900 mb-4">現在地</h3>
                      <span className="font-light text-sm">
                        エンジニア歴4年目
                        <br></br>
                        現在Webシステムの開発に貢献。現場での評価を得て、チームリーダーを任され、要件定義や設計、チームのリソース管理や開発スケジュールの調整なども経験。エンジニアとしてのスキルアップを目指すとともに、社会への貢献を目的として、副業案件を募集しています。
                      </span>
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-sans font-light text-slate-900 mb-4">略歴</h3>
                    <motion.p 
                      className="text-md sm:text-base text-slate-900 font-light leading-relaxed"
                      variants={itemVariants}
                    >
                      {about.description}
                    </motion.p>
                  </div>
                  {/* Article and GitHub Link Buttons */}
                  <motion.div variants={itemVariants} className="hidden mt-4 md:flex flex-col gap-4">
                    <motion.a
                      href="https://zenn.dev/sanpi34"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='underline flex items-center gap-2 hover:opacity-40 w-fit transition-all duration-200'
                    >
                      <img src='/images/zenn-icon.svg' className='w-10 h-10'></img>
                      <span>zennの記事を見る</span>
                    </motion.a>
                    <motion.a
                      href="https://github.com/sanpicule"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='underline flex items-center gap-2 hover:opacity-40 w-fit transition-all duration-200'
                    >
                      <img src='/images/github-icon.svg' className='w-10 h-10' />
                      <span>GitHubを見る</span>
                    </motion.a>
                    <motion.a
                      href="https://sanpicule.github.io/my-information/skill-sheet.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='underline flex items-center gap-2 hover:opacity-40 w-fit transition-all duration-200'
                    >
                      <img src='/images/pdf-icon.svg' className='w-10 h-10' />
                      <span>スキルシートをダウンロードする</span>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Work Experience */}
          <motion.div variants={itemVariants}>
            <motion.div
              variants={cardVariants}
            >
              <h3 className="text-2xl font-sans font-light text-slate-900 mb-4">
                職歴・経験
              </h3>
              
              <div className="space-y-4">
                {about.workHistory.map((work, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-5 border-l-2 border-slate-200"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute left-0 top-0 w-2 h-2 bg-slate-400 rounded-full -translate-x-1" />
                    <h4 className="font-sans text-slate-900 text-base font-semibold mb-1">{work.company}</h4>
                    <span className="text-sm text-slate-500 font-light flex items-center gap-2 mb-2">
                      <span className="text-slate-400">●</span>
                      {work.period}
                    </span>
                    <p className="text-slate-800 text-sm font-light mb-2">{work.position}</p>
                    <p className="text-slate-500 text-sm font-light">{work.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Article and GitHub Link Buttons */}
          <motion.div variants={itemVariants} className="md:hidden mt-4 flex flex-col gap-3">
            <motion.a
              href="https://zenn.dev/sanpi34"
              target="_blank"
              rel="noopener noreferrer"
              className='underline flex items-center gap-2'
            >
              <img src='/images/zenn-icon.svg' className='w-8 h-8' />
              <span>zennの記事を見る</span>
            </motion.a>
            <motion.a
              href="https://github.com/sanpicule"
              target="_blank"
              rel="noopener noreferrer"
              className='underline flex items-center gap-2'
            >
              <img src='/images/github-icon.svg' className='w-8 h-8' />
              <span>GitHubを見る</span>
            </motion.a>
            <motion.a
              href="https://sanpicule.github.io/my-information/skill-sheet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className='underline flex items-center gap-2'
            >
              <img src='/images/pdf-icon.svg' className='w-8 h-8' />
              <span>スキルシートをダウンロードする</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

import { motion } from 'framer-motion';
import { MapPin, Briefcase, Award } from 'lucide-react';

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
  level: number;
  category: string;
}

interface AboutProps {
  about: AboutData;
  skills: Skill[];
}

const About = ({ about, skills }: AboutProps) => {
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

  const skillTagVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut" as const
      }
    })
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
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-sans font-light text-slate-900 mb-6">About</h2>
          
          <motion.p 
            className="text-sm sm:text-base text-slate-600 font-light leading-relaxed"
            variants={itemVariants}
          >
            {about.description}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Info */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="relative mb-6 p-6 bg-white border border-slate-200 rounded-xl"
              variants={cardVariants}
            >
              <div className="relative z-10">
                <div className="md:flex items-center gap-8">
                  <motion.div
                    className="w-24 h-24 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden"
                    variants={cardVariants}
                  >
                    <img 
                      src="/images/profile.jpg" 
                      alt="スガタ" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl font-sans font-medium text-slate-900 mb-2">スガタ</h3>
                    <p className="text-slate-600 mb-6 font-light text-sm">Frontend Developer</p>
                    
                    <div className="space-y-1">
                      <motion.div 
                        className="flex items-center gap-3 text-slate-600"
                        variants={itemVariants}
                      >
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="font-light">静岡県焼津市出身</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-3 text-slate-600"
                        variants={itemVariants}
                      >
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="font-light">東京都世田谷区在住</span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <motion.div 
                  className="mt-6 pt-6 border-t border-slate-200"
                  variants={itemVariants}
                >
                  <h4 className="text-sm font-sans font-light text-slate-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-slate-600" />
                    主要スキル
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills && skills.length > 0 ? (
                      skills.slice(0, 6).map((skill, i) => (
                        <motion.span
                          key={skill.name}
                          className="text-xs rounded-lg font-light bg-slate-100 p-2 border border-slate-200 text-slate-700"
                          custom={i}
                          variants={skillTagVariants}
                        >
                          {skill.name}
                        </motion.span>
                      ))
                    ) : (
                      ['TypeScript', 'React', 'Next.js'].map((skill, i) => (
                        <motion.span
                          key={skill}
                          className="text-xs rounded-lg font-light bg-slate-100 p-2 border border-slate-200 text-slate-700"
                          custom={i}
                          variants={skillTagVariants}
                        >
                          {skill}
                        </motion.span>
                      ))
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </motion.div>

          {/* Work Experience */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="p-6 bg-white border border-slate-200 rounded-xl"
              variants={cardVariants}
            >
              <h3 className="text-lg font-sans font-light text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-slate-600" />
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
                  >
                    <div className="absolute left-0 top-0 w-2 h-2 bg-slate-400 rounded-full -translate-x-1" />
                    <h4 className="font-sans text-slate-900 text-base font-semibold mb-1">{work.company}</h4>
                    <span className="text-sm text-slate-500 font-light flex items-center gap-2 mb-2">
                      <span className="text-slate-400">●</span>
                      {work.period}
                    </span>
                    <p className="text-slate-600 text-sm font-light mb-2">{work.position}</p>
                    <p className="text-slate-500 text-sm font-light">{work.description}</p>
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

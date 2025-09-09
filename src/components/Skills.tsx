import { motion } from 'framer-motion';
import { Code, Database, Server, Settings } from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

const Skills = ({ skills }: SkillsProps) => {
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

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section id="skills" className="section-padding bg-white">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-sans font-light text-slate-900 mb-6">
            Skills
          </h2>
          
          <motion.p 
            className="text-sm sm:text-base text-slate-600 max-w-3xl font-light leading-relaxed"
          >
            フロントエンド開発を中心に、幅広い技術スタックを習得しています。
            各技術の習熟度を5段階で評価し、継続的な学習とスキル向上に取り組んでいます。
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend Skills */}
          <motion.div>
            <motion.div
              className="p-6 bg-white border border-slate-200 rounded-xl h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-lg font-sans font-light text-slate-900">フロントエンド</h3>
                  <span className="text-sm text-slate-500 font-light">Frontend Development</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {getSkillsByCategory('frontend').map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}/5</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-slate-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div>
            <motion.div
              className="p-6 bg-white border border-slate-200 rounded-xl h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-lg font-sans font-light text-slate-900">バックエンド</h3>
                  <span className="text-sm text-slate-500 font-light">Backend Development</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {getSkillsByCategory('backend').map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}/5</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-slate-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Database Skills */}
          <motion.div>
            <motion.div
              className="p-6 bg-white border border-slate-200 rounded-xl h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-lg font-sans font-light text-slate-900">データベース</h3>
                  <span className="text-sm text-slate-500 font-light">Database & Storage</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {getSkillsByCategory('database').map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}/5</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-slate-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Tools Skills */}
          <motion.div>
            <motion.div
              className="p-6 bg-white border border-slate-200 rounded-xl h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-lg font-sans font-light text-slate-900">ツール</h3>
                  <span className="text-sm text-slate-500 font-light">Development Tools</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {getSkillsByCategory('tool').map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}/5</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-slate-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
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

export default Skills;

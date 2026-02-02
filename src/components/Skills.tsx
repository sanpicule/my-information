import { useState } from 'react';
import { Skill } from '../types';
import { Code, Database, Server, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillsProps {
  skills: Skill[];
}

// カテゴリ定義をコンポーネントの外に配置
const skillCategories = [
  { name: 'Frontend', category: 'frontend', icon: <Code className="w-5 h-5" /> },
  { name: 'Backend & DB', category: 'backend', icon: <Server className="w-5 h-5" /> },
  { name: 'Cloud', category: 'database', icon: <Database className="w-5 h-5" /> },
  { name: 'Tools', category: 'tool', icon: <Settings className="w-5 h-5" /> },
];

const Skills = ({ skills }: SkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0].category);

  // レンダリング内で直接フィルタリング
  const filteredSkills = skills.filter(skill => 
    skill.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
  );

  const getLevelWidth = (level: string) => {
    const years = parseInt(level.match(/\d+/)?.[0] || '1');
    if (years >= 4) return '100%';
    if (years === 3) return '80%';
    if (years === 2) return '60%';
    return '40%';
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-light tracking-tighter">Skills & Expertise</h2>
          <p className="mt-2 text-base text-accent max-w-2xl">A look at the technologies I work with.</p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`flex items-center gap-3 py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-300
                ${selectedCategory === cat.category 
                  ? 'bg-primary text-dark' 
                  : 'bg-dark/50 text-light hover:bg-dark'
                }`
              }
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="min-h-[200px]">
          <h3 className="text-2xl font-bold text-light mb-4">
            {skillCategories.find(c => c.category === selectedCategory)?.name}
          </h3>
          
          {filteredSkills.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredSkills.map(skill => (
                <motion.div
                  key={skill.name}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img src={skill.icon} className="w-8 h-8" alt={skill.name} />
                    <h4 className="font-bold text-light text-md">{skill.name}</h4>
                  </div>
                  <p className="text-xs text-accent mb-2 min-h-[32px] flex items-center">{skill.level}</p>
                  <div className="w-full bg-accent/20 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-primary h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: getLevelWidth(skill.level) }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-accent">No skills found in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;

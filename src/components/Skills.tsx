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
          <h2 className="text-4xl sm:text-5xl font-bold text-dark tracking-wide">Skills</h2>
          <p className="mt-2 text-base text-gray-600 max-w-2xl">
            私が持つ技術や経験をご覧ください。各技術のスキル感を5段階評価しています。
            <br></br>
            <span className="text-xs text-gray-500">
              ※なおこちらは主要な技術のみ表示しています。詳しくは、スキルシートをご覧ください
            </span>
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`flex items-center gap-3 py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-300
                ${selectedCategory === cat.category 
                  ? 'bg-dark text-light' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-200'
                }`
              }
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* --- Skills Display --- */}
        <div className="min-h-[200px]">
          <h3 className="text-2xl font-bold text-dark mb-4">
            {skillCategories.find(c => c.category === selectedCategory)?.name}
          </h3>
          
          {filteredSkills.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredSkills.map(skill => (
                <motion.div
                  key={skill.name}
                  className="glass-card p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img src={skill.icon} className="w-8 h-8" alt={skill.name} />
                    <h4 className="font-bold text-dark text-md">{skill.name}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 min-h-[32px] flex items-center">{skill.level}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-dark h-1.5 rounded-full"
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
            <p className="text-gray-600">No skills found in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;

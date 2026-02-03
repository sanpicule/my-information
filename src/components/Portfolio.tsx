'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Project } from '../types';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useIsHoverable } from '../hooks/useIsHoverable';

interface PortfolioProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

const ProjectCard = ({ project, onProjectSelect }: { project: Project, onProjectSelect: (p: Project) => void }) => {
  const isHoverable = useIsHoverable();
  const [isHovering, setIsHovering] = useState(false); // 新しいstate

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' as const } }
  };

  return (
    <motion.div
      layout
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] border border-transparent"
      onClick={() => onProjectSelect(project)}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      onHoverStart={() => isHoverable && setIsHovering(true)}
      onHoverEnd={() => isHoverable && setIsHovering(false)}
      whileHover={isHoverable ? { borderColor: '#6B7280', transition: { type: 'spring' as const, stiffness: 300 } } : {}}
    >
      {/* --- Base Content --- */}
      <div className="w-full h-full flex flex-col">
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 md:group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" /> {/* グラデーションもモノクロライトに合わせて調整 */}
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-md font-bold text-light mb-1 truncate">{project.title}</h3>
          <p className="text-white/80 text-sm line-clamp-2">{project.description}</p>
        </div>
      </div>

      {/* --- Hover Overlay --- */}
      {isHoverable && (
        <motion.div 
          className="absolute inset-0 p-6 bg-white/80 backdrop-blur-md flex flex-col justify-end"
          variants={overlayVariants}
          initial="hidden"
          animate={isHovering ? "visible" : "hidden"} // ← whileHover を animate に変更
        >
          <h3 className="text-xl font-bold text-gray-700 mb-2">{project.title}</h3> {/* テキスト色をダーク系に */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p> {/* テキスト色をダーク系に */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map(tech => (
              <span key={tech} className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full"> {/* モノクロライトに合わせたタグ色 */}
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

const Portfolio = ({ projects, onProjectSelect }: PortfolioProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const personalProjects = projects.filter((p) => p.type === 'portfolio');

  return (
    <section id="portfolio" className="section-padding">
      <div 
        className="container-max"
        ref={containerRef}
      >
        <motion.div 
          className="mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dark tracking-wide">Portfolio</h2>
          <p className="mt-2 text-base text-gray-600 max-w-2xl">
            私が開発したプロジェクトをご覧ください。
          </p>
        </motion.div>

        {personalProjects.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {personalProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project} 
                onProjectSelect={onProjectSelect}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;

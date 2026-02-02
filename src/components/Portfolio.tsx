'use client';

import { motion } from 'framer-motion';
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

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      layout
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => onProjectSelect(project)}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      whileHover={isHoverable ? { scale: 1.03, transition: { type: 'spring', stiffness: 300 } } : {}}
    >
      {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 md:group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-light mb-2">{project.title}</h3>
        {/* Initially visible on larger cards or all cards if no hover */}
        <div className={`hidden md:block ${isHoverable ? 'md:group-hover:hidden' : ''} transition-opacity duration-300`}>
          <p className="text-accent text-sm line-clamp-2">{project.description}</p>
        </div>
      </div>

      {isHoverable && (
        <motion.div 
          className="absolute inset-0 p-6 bg-dark/80 backdrop-blur-sm flex flex-col justify-end"
          variants={overlayVariants}
          initial="hidden"
          whileHover="visible"
        >
          <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
          <p className="text-accent text-sm mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map(tech => (
              <span key={tech} className="tag">
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
          <h2 className="text-3xl sm:text-4xl font-black text-light tracking-tighter">My Works</h2>
          <p className="mt-2 text-base text-accent max-w-2xl">
            A selection of projects I've worked on.
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

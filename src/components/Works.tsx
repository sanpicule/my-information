'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Calendar, Tag, Users } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  type: 'portfolio' | 'work';
  githubUrl?: string;
  demoUrl?: string;
  duration: string;
  role: string;
  challenge?: string;
  solution?: string;
  learnings?: string[];
  category: string;
  screenshots?: string[];
}

interface WorksProps {
  projects: Project[];
}

const Works = ({ projects }: WorksProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  

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
      opacity: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  // フィルターは使用しないため、一覧はそのまま projects を表示

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const personalProjects = projects.filter((p) => p.type === 'portfolio');
  const workProjects = projects.filter((p) => p.type === 'work');

  return (
    <section id="works" className="section-padding bg-slate-50">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-light text-slate-900 mb-6">
            Works
          </h2>
          
          <motion.p 
              className="text-sm sm:text-base text-slate-600 font-light leading-relaxed"
            variants={itemVariants}
          >
            これまでに手がけたプロジェクトや制作物をご紹介します。
            各プロジェクトの詳細や技術的な特徴についても詳しくご覧いただけます。
          </motion.p>
        </motion.div>

        {/* フィルター機能は削除 */}

        {/* 参画案件（先に表示） */}
        {workProjects.length > 0 && (
          <>
            <motion.h3 
              className="text-base sm:text-lg font-medium text-slate-900 mb-4"
              variants={itemVariants}
            >
              参画案件
            </motion.h3>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12"
              variants={containerVariants}
            >
              {workProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group bg-white shadow-md rounded-xl overflow-hidden cursor-pointer"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  {project.thumbnail && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <h3 
                      className="text-lg sm:text-xl font-sans font-medium text-slate-900 mb-3 group-hover:text-slate-700 transition-colors duration-300 cursor-pointer"
                      onClick={() => openModal(project)}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-4 line-clamp-2 font-light leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-light mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{project.role}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-light rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 text-xs font-light rounded-lg">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 sm:mt-5 flex flex-col gap-2">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-3 sm:px-4 py-2 bg-slate-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Github size={16} />
                          コードを見る
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* 個人開発（後に表示） */}
        {personalProjects.length > 0 && (
          <>
            <motion.h3 
              className="text-base sm:text-lg font-medium text-slate-900 mb-4"
              variants={itemVariants}
            >
              個人開発
            </motion.h3>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
            >
              {personalProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group bg-white shadow-md rounded-xl overflow-hidden cursor-pointer"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  {/* Thumbnail for portfolio projects */}
                  {project.thumbnail && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <h3 
                      className="text-lg sm:text-xl font-sans font-medium text-slate-900 mb-3 group-hover:text-slate-700 transition-colors duration-300 cursor-pointer"
                      onClick={() => openModal(project)}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-4 line-clamp-2 font-light leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-light mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{project.role}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-light rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 text-xs font-light rounded-lg">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 sm:mt-5 flex flex-col gap-2">
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-3 sm:px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ExternalLink size={16} />
                          制作物を見る
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-3 sm:px-4 py-2 bg-slate-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Github size={16} />
                          コードを見る
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-end p-4 border-b border-slate-200">
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors duration-300"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Project Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-sans font-light text-slate-900 mb-4">
                    {selectedProject.title}
                  </h2>
                  
                  <p className="text-lg text-slate-600 font-light leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Project Details Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Project Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-sm text-slate-500">期間</p>
                        <p className="font-medium text-slate-900">{selectedProject.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-sm text-slate-500">役割</p>
                        <p className="font-medium text-slate-900">{selectedProject.role}</p>
                      </div>
                    </div>
                    
                    {selectedProject.challenge && (
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-slate-600" />
                        <div>
                          <p className="text-sm text-slate-500">課題</p>
                          <p className="font-medium text-slate-900">{selectedProject.challenge}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedProject.solution && (
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-slate-600" />
                        <div>
                          <p className="text-sm text-slate-500">解決策</p>
                          <p className="font-medium text-slate-900">{selectedProject.solution}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-medium text-slate-900 mb-4">使用技術</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-2 bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {(selectedProject.githubUrl || (selectedProject.demoUrl && selectedProject.type === 'portfolio')) && (
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
                    {selectedProject.githubUrl && (
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github size={20} />
                        コードを見る
                      </motion.a>
                    )}
                    
                    {selectedProject.demoUrl && selectedProject.type === 'portfolio' && (
                      <motion.a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink size={20} />
                        サイトを見る
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Works;

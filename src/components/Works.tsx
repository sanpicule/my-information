'use client';

import { motion } from 'framer-motion';
import { Project } from '../types';

interface WorksProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

const Works = ({ projects, onProjectSelect }: WorksProps) => {
  

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

  // フィルターは使用しないため、一覧はそのまま projects を表示

  const openModal = (project: Project) => {
    onProjectSelect(project);
  };

  const personalProjects = projects.filter((p) => p.type === 'portfolio');

  return (
    <section id="portfolio" className="section-padding bg-slate-50">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-slate-900 mb-6">
            Portfolio
          </h2>
          
          <motion.p 
              className="text-sm sm:text-base text-slate-800 font-light leading-relaxed"
            variants={itemVariants}
          >
            これまでに手がけたプロジェクトや制作物をご紹介します。
            各プロジェクトの詳細や技術的な特徴についても詳しくご覧いただけます。
          </motion.p>
        </motion.div>

        {/* フィルター機能は削除 */}

        {/* 個人開発 */}
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
                    <div className="overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-[200px] object-fit object-center"
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
                    <p className="text-sm sm:text-base text-slate-800 mb-4 line-clamp-2 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default Works;

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, Tag, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
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

  return (
    <section id="project-detail" className="section-padding bg-slate-50 min-h-screen">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 p-4 bg-white border border-slate-200 rounded-full text-slate-700 md:hover:bg-slate-50 transition-colors duration-300 shadow-md"
          >
            <ArrowLeft size={16} />
          </button>
        </motion.div>

        {/* Links */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 p-4 bg-slate-600 border border-slate-300 text-white rounded-full font-medium hover:bg-slate-800 hover:border-slate-400 transition-colors duration-300 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={16} />
            </motion.a>
          )}
          
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors duration-300 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={16} />
            </motion.a>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <h1 className="text-2xl font-bold mb-4">
            {project.title}
          </h1>

          <p className="text-md font-light leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Project Details Grid */}
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-12 mb-12">
          {/* Screenshots Carousel */}
          <motion.div variants={itemVariants}>
            <div className='mt-4 lg:mt-16'>
              {project.screenshots.length > 0 ? (
                <div className="relative">
                  {/* Thumbnail Preview */}
                  <div className="hidden sm:flex justify-center mb-4 space-x-2">
                    {project.screenshots.map((screenshot, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                          index === currentImageIndex ? 'border-slate-600 scale-110' : 'border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <img
                          src={screenshot.src}
                          alt={`thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-slate-600/20"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-slate-200">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={project.screenshots[currentImageIndex].src}
                        alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                        className="w-full object-cover"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeOut"}}
                      />
                    </AnimatePresence>
                    
                    {/* Navigation Arrows */}
                    {project.screenshots.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Dots Indicator */}
                  {project.screenshots.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                      {project.screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-slate-600' : 'bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-slate-500">スクリーンショットはありません</p>
              )}
            </div>
          </motion.div>
          
          <div className='flex flex-col gap-12'>
            {/* Project Info */}
            <motion.div variants={itemVariants}>
              <div className="lg:mt-16 rounded-xl text-gray-800">
                <div className="space-y-4 mt-8 bg-slate-300 p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-6 h-6" />
                    <div>
                      <p className="text-sm">期間</p>
                      <p className="font-medium">{project.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Tag className="w-6 h-6" />
                    <div>
                      <p className="text-sm">使用技術</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-800 text-white text-sm font-medium rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Image Comment */}
            <motion.div variants={itemVariants}>
              <div className="">
                <div className="flex flex-col md:flex-row gap-2">
                  <AnimatePresence mode="wait">
                    {project.screenshots[currentImageIndex].icon && (
                      <motion.img
                        src={project.screenshots[currentImageIndex].icon}
                        alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                        className="w-14 h-14 md:w-20 md:h-20"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    )}
                    <motion.p
                      key={currentImageIndex}
                      className="text-slate-700 font-light text-sm leading-relaxed"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      {project.screenshots[currentImageIndex].comment}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectDetail;
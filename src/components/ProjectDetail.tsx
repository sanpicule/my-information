import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useIsHoverable } from '../hooks/useIsHoverable';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  const isHoverable = useIsHoverable();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const linkHover = isHoverable ? { scale: 1.05 } : {};

  return (
    <section id="project-detail" className="section-padding pt-32">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Page Header --- */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex justify-between items-start mb-6">
            <motion.button onClick={onBack} className="btn-icon glass-card" whileHover={linkHover} whileTap={{ scale: 0.9 }}>
              <ArrowLeft size={20} className="text-gray-700"/>
            </motion.button>
            <div className="flex gap-3">
              {project.demoUrl && (
                <motion.a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" whileHover={linkHover} whileTap={{ scale: 0.95 }}>
                  <ExternalLink size={16} /> View Live
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" whileHover={linkHover} whileTap={{ scale: 0.95 }}>
                  <Github size={16} /> GitHub
                </motion.a>
              )}
            </div>
          </div>
          <h1 className="text-2xl md:text-5xl font-black text-dark tracking-tighter">{project.title}</h1>
        </motion.div>

        {/* --- Main Content Grid --- */}
        <div className="grid lg:grid-cols-5 gap-x-12 gap-y-8">
          {/* Left Column: Image Gallery */}
          <motion.div className="lg:col-span-3 space-y-4" variants={itemVariants}>
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg border border-gray-200 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={project.screenshots.length > 0 ? project.screenshots[currentImageIndex].src : project.thumbnail}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full object-cover aspect-video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            {/* Thumbnails */}
            {project.screenshots.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {project.screenshots.map((screenshot, index) => (
                  <button key={index} onClick={() => setCurrentImageIndex(index)}>
                    <img
                      src={screenshot.src}
                      alt={`thumbnail ${index + 1}`}
                      className={`w-full h-full object-cover rounded-md border-2 transition-all duration-300 ${
                        index === currentImageIndex ? 'border-sky-500' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column: Details */}
          <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
            <div>
              <h3 className="text-2xl font-bold text-dark mb-4">About this project</h3>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>
            <div className="glass-card p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-dark"><Calendar className="w-5 h-5 text-sky-600" /><p><span className="text-gray-600 text-sm">期間:</span> {project.duration}</p></div>
                <div className="text-dark"><div className="flex items-center gap-4 mb-3"><Tag className="w-5 h-5 text-sky-600" /><span className="text-gray-600 text-sm">使用技術</span></div><div className="flex flex-wrap gap-2">{project.technologies.map(tech => (<span key={tech} className="tag">{tech}</span>))}</div></div>
              </div>
            </div>
            <div className="min-h-[80px]">
              <h3 className="text-xl font-bold text-dark mb-3">Feature</h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 text-sm leading-relaxed"
                >
                  {project.screenshots.length > 0 ? project.screenshots[currentImageIndex].comment : "No specific feature comment."}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectDetail;

// Add some reusable classes to index.css if they don't exist
// .btn { @apply inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full transition-transform duration-300; }
// .btn-primary { @apply bg-primary text-dark; }
// .btn-secondary { @apply bg-dark/50 text-light border border-accent/50; }
// .btn-icon { @apply w-12 h-12 flex items-center justify-center; }
// .carousel-arrow { @apply absolute top-1/2 -translate-y-1/2 bg-dark/50 text-white p-2 rounded-full md:hover:bg-dark/80 transition-colors z-10; }
// .tag { @apply px-2 py-1 bg-primary/20 text-primary-light text-sm font-medium rounded-md; }
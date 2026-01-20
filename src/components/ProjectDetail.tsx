import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Tag, Users, ArrowLeft } from 'lucide-react';

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

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            <span>戻る</span>
          </button>
        </motion.div>

        {/* Project Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl font-sans font-light text-slate-900 mb-4">
            {project.title}
          </h1>
          
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Project Details Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Project Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-white p-8 rounded-xl border border-slate-200">
              <h2 className="text-2xl font-sans font-light text-slate-900 mb-6">プロジェクト情報</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-500">期間</p>
                    <p className="font-medium text-slate-900">{project.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-500">役割</p>
                    <p className="font-medium text-slate-900">{project.role}</p>
                  </div>
                </div>
                
                {project.challenge && (
                  <div className="flex items-center gap-4">
                    <Tag className="w-6 h-6 text-slate-600" />
                    <div>
                      <p className="text-sm text-slate-500">課題</p>
                      <p className="font-medium text-slate-900">{project.challenge}</p>
                    </div>
                  </div>
                )}
                
                {project.solution && (
                  <div className="flex items-center gap-4">
                    <Tag className="w-6 h-6 text-slate-600" />
                    <div>
                      <p className="text-sm text-slate-500">解決策</p>
                      <p className="font-medium text-slate-900">{project.solution}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <Tag className="w-6 h-6 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-500">使用技術</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-sm font-light rounded-lg"
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

          {/* Screenshots */}
          <motion.div variants={itemVariants}>
            <div className="bg-white p-8 rounded-xl border border-slate-200">
              <h2 className="text-2xl font-sans font-light text-slate-900 mb-6">スクリーンショット</h2>
              
              {project.screenshots && project.screenshots.length > 0 ? (
                <div className="space-y-4">
                  {project.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full rounded-lg border border-slate-200"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">スクリーンショットはありません</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Learnings */}
        {project.learnings && project.learnings.length > 0 && (
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-white p-8 rounded-xl border border-slate-200">
              <h2 className="text-2xl font-sans font-light text-slate-900 mb-6">学んだこと</h2>
              
              <ul className="space-y-3">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700 font-light">{learning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Links */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors duration-300"
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={16} />
              コードを見る
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectDetail;
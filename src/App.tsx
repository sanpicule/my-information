import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import ProjectDetail from '@/components/ProjectDetail';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { profileData } from '@/lib/data';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Project } from '@/types';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import Portfolio from '@/components/Portfolio';
import useCustomCursor from './hooks/useCustomCursor';

function App() {
  useCustomCursor();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 2800); // Increased loading time for better animation experience

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div key="loader" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
          <LoadingScreen />
        </motion.div>
      ) : (
        <Router>
          <AnimatedRoutes />
        </Router>
      )}
    </AnimatePresence>
  );
}

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 50 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function MainPage() {
  const navigate = useNavigate();

  const handleProjectSelect = (project: Project) => {
    navigate(`/portfolio/${project.id}`);
  };

  return (
    <motion.main 
      className="min-h-screen-dynamic"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Header />
      <Hero
        name={profileData.name}
        introduction={profileData.introduction}
      />
      <About about={profileData.about} />
      <Skills skills={profileData.skills} />
      <Portfolio projects={profileData.projects} onProjectSelect={handleProjectSelect} />
      <Contact contact={profileData.contact} />
      <Footer contact={profileData.contact} />
    </motion.main>
  );
}

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = profileData.projects.find(p => p.id === id);

  if (!project) {
    // Or redirect to a 404 page
    return <div>Project not found</div>;
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <motion.main 
      className="min-h-screen-dynamic"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Header />
      <ProjectDetail project={project} onBack={handleBack} />
      <Footer contact={profileData.contact} />
    </motion.main>
  );
}

export default App;

const LoadingScreen = () => {
  const progress = useMotionValue(0);
  const percentage = useTransform(progress, (v) => `${Math.floor(v)}%`);
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const strokeDashoffset = useTransform(progress, (v) => circumference * (1 - v / 100));

  useEffect(() => {
    const animation = animate(progress, 100, { 
      duration: 2.5, 
      ease: 'easeInOut'
    });
    return animation.stop;
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark">
      <div className="relative w-48 h-48">
        <motion.svg
          className="absolute inset-0"
          viewBox="0 0 100 100"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        >
          {/* Background circle */}
          <circle
            cx="50" cy="50" r="45"
            strokeWidth="4"
            className="stroke-accent/20"
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50" cy="50" r="45"
            strokeWidth="4"
            className="stroke-primary"
            fill="transparent"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={useTransform(progress, v => 1 - v / 100)}
            transform="rotate(-90 50 50)"
          />
        </motion.svg>

        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
        >
          <motion.p className="text-xl font-bold tabular-nums text-light">
            {percentage}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

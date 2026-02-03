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
import { motion, AnimatePresence } from 'framer-motion';
import Portfolio from '@/components/Portfolio';
import useCustomCursor from './hooks/useCustomCursor';

// --- Loading Screen ---
const textContainerVariants = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const letterVariants = {
  initial: { y: 0, opacity: 1 },
  animate: {
    y: [0, -15, 0],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.8,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
};

const panelVariants = {
  initial: { y: "100vh" },
  animate: { y: "100vh" },
  exit: (custom: number) => ({
    y: ["100vh", "0vh", "-100vh"],
    transition: {
      times: [0, 0.5, 1],
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: custom * 0.1,
    }
  })
};

const LoadingScreen = () => {
  const text = "SANSHIRO HIKAWA";
  const letters = Array.from(text);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-gray-100"
      key="loader"
      exit="exit"
    >
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        variants={textContainerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
                  <motion.h1
                    className="text-2xl font-bold text-gray-400 flex overflow-hidden py-4"
                    aria-label={text}
                  >          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ whiteSpace: 'pre' }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
      
      <div className="absolute inset-0 flex">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gray-200"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={i}
          />
        ))}
      </div>
    </motion.div>
  );
};


// --- Main App ---
function App() {
  useCustomCursor();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 3000); // Animation Time

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? <LoadingScreen /> : (
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
  type: "tween" as const,
  ease: "anticipate" as const,
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
  const handleProjectSelect = (project: Project) => navigate(`/portfolio/${project.id}`);

  return (
    <motion.main
      className="min-h-screen-dynamic"
      initial="initial" animate="in" exit="out"
      variants={pageVariants} transition={pageTransition}
    >
      <Header />
      <Hero introduction={profileData.introduction} />
      <About about={profileData.about} />
      <Skills skills={profileData.skills} />
      <Portfolio projects={profileData.projects} onProjectSelect={handleProjectSelect} />
      <Contact contact={profileData.contact} />
      <Footer />
    </motion.main>
  );
}

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const project = profileData.projects.find(p => p.id === id);
  if (!project) { return <div>Project not found</div>; }

  const handleBack = () => navigate('/');

  return (
    <motion.main
      className="min-h-screen-dynamic"
      initial="initial" animate="in" exit="out"
      variants={pageVariants} transition={pageTransition}
    >
      <Header />
      <ProjectDetail project={project} onBack={handleBack} />
      <Footer />
    </motion.main>
  );
}

export default App;

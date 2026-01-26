import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Works from '@/components/Works';
import ProjectDetail from '@/components/ProjectDetail';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { profileData } from '@/lib/data';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Project } from '@/types';
import { motion } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/works/:id" element={<ProjectDetailPage />} />
      </Routes>
    </Router>
  );
}

function MainPage() {
  const navigate = useNavigate();

  const handleProjectSelect = (project: Project) => {
    navigate(`/works/${project.id}`);
  };

  return (
    <main className="min-h-screen-dynamic">
      <Header />
      <Hero
        name={profileData.name}
        introduction={profileData.introduction}
        contact={profileData.contact}
      />
      <About about={profileData.about} skills={profileData.skills} />
      <Skills skills={profileData.skills} />
      <Works projects={profileData.projects} onProjectSelect={handleProjectSelect} />
      <Contact contact={profileData.contact} />
      <Footer contact={profileData.contact} />
    </main>
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
    return <div>Project not found</div>;
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main className="min-h-screen-dynamic">
      <Header />
      <ProjectDetail project={project} onBack={handleBack} />
      <Footer contact={profileData.contact} />
    </main>
  );
}

export default App;

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 1 : 100);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl font-bold text-white mb-8"
        >
          Loading
        </motion.h1>
        
        <div className="w-64 h-2 bg-gray-700 rounded mb-4">
          <motion.div
            className="h-full bg-white rounded"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
        
        <div className="text-white text-sm">
          {progress}%
        </div>
      </motion.div>
    </div>
  );
};

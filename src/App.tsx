import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Works from '@/components/Works';
import ProjectDetail from '@/components/ProjectDetail';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { profileData } from '@/lib/data';
import { useViewportHeight } from '@/hooks/useViewportHeight';
import { useState } from 'react';

function App() {
  // ビューポート高さの動的制御
  useViewportHeight();
  
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWorks = () => {
    setSelectedProject(null);
  };

  if (selectedProject) {
    return (
      <main className="min-h-screen-dynamic">
        <Header />
        <ProjectDetail project={selectedProject} onBack={handleBackToWorks} />
        <Footer contact={profileData.contact} />
      </main>
    );
  }

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

export default App;

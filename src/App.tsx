import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Works from '@/components/Works';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { profileData } from '@/lib/data';
import { useViewportHeight } from '@/hooks/useViewportHeight';

function App() {
  // ビューポート高さの動的制御
  useViewportHeight();

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
      <Works projects={profileData.projects} />
      <Contact contact={profileData.contact} />
      <Footer contact={profileData.contact} />
    </main>
  );
}

export default App;

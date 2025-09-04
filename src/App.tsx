import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Works from './components/Works';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { profileData } from './lib/data';

function App() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero
        contact={profileData.contact}
      />
      <About workExperience={profileData.about.workHistory} />
      <Skills skills={profileData.skills} />
      <Works projects={profileData.projects} />
      <Contact contact={profileData.contact} />
      <Footer contact={profileData.contact} />
    </main>
  );
}

export default App;

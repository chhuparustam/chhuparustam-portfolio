import { useEffect, useState } from 'react';
import Navigation from './components/navigation/Navigation.jsx';
import './components/navigation/Navigation.css';
import CyberBackground from './components/background/CyberBackground.jsx';
import './components/background/CyberBackground.css';
import CursorGlow from './components/fx/CursorGlow.jsx';
import Hero from './components/hero/Hero.jsx';
import './components/hero/Hero.css';
import AboutPreview from './components/about/AboutPreview.jsx';
import './components/about/AboutPreview.css';
import FeaturedProject from './components/projects/FeaturedProject.jsx';
import './components/projects/FeaturedProject.css';
import './components/projects/ProjectCard.css';
import './components/projects/ProjectEntry.css';
import StackSection from './components/stack/StackSection.jsx';
import './components/stack/StackSection.css';
import JourneySection from './components/journey/JourneySection.jsx';
import './components/journey/JourneySection.css';
import SecurityLab from './components/securitylab/SecurityLab.jsx';
import './components/securitylab/SecurityLab.css';
import Credentials from './components/credentials/Credentials.jsx';
import './components/credentials/Credentials.css';
import ContactPreview from './components/contact/ContactPreview.jsx';
import './components/contact/ContactPreview.css';
import './components/contact/ContactForm.css';
import ProjectDetail from './pages/ProjectDetail.jsx';
import './pages/ProjectDetail.css';
import './components/projects/ProjectCaseStudy.css';
import Footer from './components/layout/Footer.jsx';
import './components/layout/Footer.css';
import { getProjectById } from './data/projects.js';
import { getRouteFromHash } from './lib/hashRoute.js';
import './App.css';

/* Application shell — homepage sections plus a lightweight
   hash-routed project detail page (`#/project/:id`, no router
   dependency). Section anchors keep working from either route:
   arriving home with a named section scrolls to it after mount. */
function useHashRoute() {
  const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash));

  useEffect(() => {
    function onHashChange() {
      setRoute(getRouteFromHash(window.location.hash));
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

export default function App() {
  const route = useHashRoute();

  useEffect(() => {
    if (route.name !== 'home' || !route.section) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(route.section)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);

  return (
    <>
      <CyberBackground />
      <CursorGlow />
      <Navigation />
      <main className="site-main">
        {route.name === 'project' ? (
          <ProjectDetail project={getProjectById(route.id)} />
        ) : (
          <>
            <Hero />
            <AboutPreview />
            <StackSection />
            <FeaturedProject />
            <JourneySection />
            <SecurityLab />
            <Credentials />
            <ContactPreview />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

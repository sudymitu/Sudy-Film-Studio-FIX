
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProjectCarousel } from './components/ProjectCarousel';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { BackgroundImage } from './components/BackgroundImage';
import { ProjectGrid } from './components/ProjectGrid';
import { AiTools } from './components/AiTools';
import { Contact } from './components/Contact';
import { getAiTools } from './constants';
import type { Project } from './types';
import { useLanguage } from './contexts/LanguageContext';
import { loadProjects, saveProjects as saveProjectsToService } from './utils/projectService';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export type Tab = 'Home' | 'Projects' | 'AI Tools' | 'About' | 'Contact';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!sessionStorage.getItem('sudy-admin-auth'));
  const [route, setRoute] = useState(window.location.hash);

  const { t, language } = useLanguage();
  
  // Load initial projects from service only once on mount.
  // This prevents overwriting saved data when the language changes.
  useEffect(() => {
    setProjects(loadProjects(t));
  }, []);
  
  const AI_TOOLS = getAiTools(t);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };
  
  const saveProjects = (updatedProjects: Project[]) => {
    saveProjectsToService(updatedProjects);
    setProjects(updatedProjects);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('sudy-admin-auth', 'true');
    setIsAuthenticated(true);
    window.location.hash = '#dashboard';
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sudy-admin-auth');
    setIsAuthenticated(false);
    window.location.hash = '#admin';
  };

  if (route.startsWith('#admin') && !isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (route.startsWith('#dashboard') && isAuthenticated) {
    return <AdminDashboard projects={projects} setProjects={saveProjects} onLogout={handleLogout} />;
  }
  
  const background = projects[activeIndex]?.backgroundImage || projects[0]?.backgroundImage || '';

  const renderContent = () => {
    if (projects.length === 0) return null;
    switch (activeTab) {
      case 'Home':
        return <ProjectCarousel projects={projects} onProjectSelect={handleProjectSelect} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />;
      case 'Projects':
        return <ProjectGrid projects={projects} onProjectSelect={handleProjectSelect} />;
      case 'AI Tools':
        return <AiTools tools={AI_TOOLS} />;
      case 'About':
        return <About />;
      case 'Contact':
        return <Contact />;
      default:
        return null;
    }
  }

  return (
    <div className="bg-black text-gray-200 h-screen flex flex-col overflow-hidden relative">
      <BackgroundImage imageUrl={background} aspectRatio={projects[activeIndex]?.backgroundAspectRatio} />

      <div className="relative z-10 flex flex-col h-full">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in" key={activeTab}>
          {renderContent()}
        </main>

        <Footer />
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
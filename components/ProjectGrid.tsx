
import React from 'react';
import type { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectSelect }) => {
  const { t } = useLanguage();
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="font-orbitron text-3xl font-bold text-white uppercase tracking-wider text-center mb-8">{t('allProjects')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => onProjectSelect(project)}
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
               <p className="text-xs font-light tracking-widest">{project.codeName}</p>
               <h3 className="font-orbitron text-xl font-bold uppercase tracking-wider mt-1">{project.title}</h3>
            </div>
             <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400 rounded-lg transition-colors duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

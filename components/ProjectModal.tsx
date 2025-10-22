
import React, { useEffect } from 'react';
import type { Project, AspectRatio } from '../types';
import { XIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const getAspectRatioClass = (aspectRatio: AspectRatio | undefined) => {
    switch (aspectRatio) {
        case '16:9': return 'aspect-[16/9]';
        case '9:16': return 'aspect-[9/16]';
        case '4:3': return 'aspect-[4/3]';
        case '1:1': return 'aspect-square';
        case '3:4':
        default:
            return 'aspect-[3/4]';
    }
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const statusKey = project.status.replace(/\s+/g, '');
  const isProd = statusKey === 'InProduction' || statusKey === 'ĐangSảnXuất';
  const imageAspectRatioClass = getAspectRatioClass(project.thumbnailAspectRatio);


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900/80 border border-gray-700 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <XIcon />
        </button>
        <div className="grid md:grid-cols-2 gap-8">
            <div className={`h-full ${imageAspectRatioClass} md:aspect-auto`}>
                 <img src={project.image} alt={project.title} className="w-full h-full object-cover md:rounded-l-lg" />
            </div>
            <div className="p-8">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${
                    isProd ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                }`}>
                    {project.status}
                </span>
                <p className="text-sm uppercase tracking-widest text-gray-400">{project.codeName}</p>
                <h2 className="font-orbitron text-3xl font-bold text-white my-2">{project.title}</h2>

                <div className="my-6">
                    <h3 className="text-lg font-semibold text-cyan-400 tracking-wider">{t('pitch')}</h3>
                    <p className="text-gray-300 mt-2 whitespace-pre-wrap">{project.pitch}</p>
                </div>

                <div className="my-6">
                    <h3 className="text-lg font-semibold text-cyan-400 tracking-wider">{t('details')}</h3>
                    <p className="text-gray-300 mt-2 whitespace-pre-wrap">{project.details}</p>
                </div>
            </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

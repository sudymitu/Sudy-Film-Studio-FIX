import React, { useCallback, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCarouselProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  activeIndex: number;
  // FIX: Correctly type setActiveIndex to accept a value or a function update, which is the standard for React state setters.
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onProjectSelect, activeIndex, setActiveIndex }) => {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<number | null>(null);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % projects.length);
  }, [projects.length, setActiveIndex]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  }, [projects.length, setActiveIndex]);
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = window.setTimeout(() => {
        if (e.deltaY > 0 || e.deltaX > 0) {
          goNext();
        } else {
          goPrev();
        }
      }, 50); // Debounce to prevent rapid scrolling
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', handleWheel);
      }
      if(debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [goNext, goPrev]);

  const getShortestOffset = (index: number, activeIndex: number, total: number) => {
    const directOffset = index - activeIndex;
    const wrapOffset = directOffset > 0 ? directOffset - total : directOffset + total;
    return Math.abs(directOffset) < Math.abs(wrapOffset) ? directOffset : wrapOffset;
  };

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center cursor-grab" ref={carouselRef}>
      <div className="w-full flex items-center justify-center" style={{ perspective: '1200px' }}>
        <div className="relative w-full h-[350px]" style={{ transformStyle: 'preserve-3d' }}>
          {projects.map((project, index) => {
            const offset = getShortestOffset(index, activeIndex, projects.length);
            return (
              <ProjectCard
                key={project.id}
                project={project}
                offset={offset}
                onSelect={() => onProjectSelect(project)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
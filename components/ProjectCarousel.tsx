import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectCarouselProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onProjectSelect, activeIndex, setActiveIndex }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<number | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % projects.length);
  }, [projects.length, setActiveIndex]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  }, [projects.length, setActiveIndex]);

  const handleDragStart = (x: number) => {
    if (isDragging.current) return;
    isDragging.current = true;
    startX.current = x;
    currentTranslate.current = 0;
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
    }
  };

  const handleDragMove = (x: number) => {
    if (!isDragging.current) return;
    const dx = x - startX.current;
    currentTranslate.current = dx;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }

    if (Math.abs(currentTranslate.current) > 50) { // Threshold
      if (currentTranslate.current < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    currentTranslate.current = 0;
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => handleDragEnd();

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();
  
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
      }, 50);
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
    <div 
        className="relative w-full h-[60vh] md:h-[400px] flex flex-col items-center justify-center cursor-grab"
        ref={carouselRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
    >
      <div className="w-full flex items-center justify-center" style={{ perspective: '1200px' }}>
        <div className="relative w-full h-full md:h-[350px]" style={{ transformStyle: 'preserve-3d' }}>
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
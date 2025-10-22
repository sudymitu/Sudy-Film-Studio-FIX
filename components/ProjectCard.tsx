
import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { PlayIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  offset: number;
  onSelect: () => void;
}

const getAspectRatioClass = (aspectRatio: string | undefined) => {
    switch (aspectRatio) {
        case '16:9': return 'aspect-[16/9]';
        case '9:16': return 'aspect-[9/16]';
        case '3:4': return 'aspect-[3/4]';
        case '1:1': return 'aspect-square';
        case '4:3':
        default:
            return 'aspect-[4/3]';
    }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, offset, onSelect }) => {
    const isActive = offset === 0;
    const absOffset = Math.abs(offset);

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!isActive && isPlaying) {
            setIsPlaying(false);
        }
    }, [isActive, isPlaying]);

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(true);
    };

    const transform = `
        rotateY(${offset * -35}deg)
        translateX(${offset * 30}%)
        translateZ(${-absOffset * 150}px)
        scale(${isActive ? 1.05 : 0.85})
    `;

    const cardStyle: React.CSSProperties = {
        transform: transform,
        zIndex: 10 - absOffset,
        opacity: absOffset > 2 ? 0 : 1,
        transition: 'all 0.5s ease-out',
        pointerEvents: isActive ? 'auto' : 'none',
    };
    
    const aspectRatioClass = getAspectRatioClass(project.thumbnailAspectRatio);

    const renderVideoPlayer = () => {
        if (!project.videoUrl) return null;

        const isVimeo = project.videoUrl.includes('vimeo.com');
        if (isVimeo) {
            const videoIdMatch = project.videoUrl.match(/vimeo.com\/(\d+)/);
            if (videoIdMatch) {
                const videoId = videoIdMatch[1];
                return (
                    <iframe
                        src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                );
            }
        }

        // Fallback for direct video links
        return (
            <video
                ref={videoRef}
                src={project.videoUrl}
                autoPlay
                controls
                className="w-full h-full object-cover"
                onEnded={() => setIsPlaying(false)}
            />
        );
    };


    return (
        <div
            className="absolute top-0 left-0 right-0 bottom-0 m-auto w-[450px] max-w-[90vw] h-auto"
            style={cardStyle}
            onClick={isActive && !isPlaying ? onSelect : undefined}
        >
            <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 transform
                ${isActive ? 'shadow-cyan-500/60' : 'shadow-black/70'} ${aspectRatioClass}`}>
                
                {isPlaying && project.videoUrl ? (
                    renderVideoPlayer()
                ) : (
                    <>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                            <p className="text-sm font-light tracking-widest">{project.codeName}</p>
                            <h3 className="font-orbitron text-2xl font-bold uppercase tracking-wider mt-1">{project.title}</h3>
                        </div>
                    </>
                )}

                {isActive && project.videoUrl && !isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <button
                            onClick={handlePlayClick}
                            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all scale-100 hover:scale-110"
                            aria-label={`Play trailer for ${project.title}`}
                        >
                            <PlayIcon className="w-10 h-10 -mr-1" />
                        </button>
                    </div>
                )}
                 <div
                    className={`absolute inset-0 border-2 rounded-2xl transition-all duration-500 pointer-events-none
                    ${isActive ? 'border-cyan-400' : 'border-transparent'}`}
                ></div>
            </div>
        </div>
    );
};

import React from 'react';
import { AspectRatio } from '../types';

interface BackgroundImageProps {
  imageUrl: string;
  aspectRatio?: AspectRatio;
}

const getAspectRatioClass = (aspectRatio: AspectRatio | undefined) => {
    switch (aspectRatio) {
        case '9:16': return 'aspect-[9/16]';
        case '4:3': return 'aspect-[4/3]';
        case '3:4': return 'aspect-[3/4]';
        case '1:1': return 'aspect-square';
        case '16:9':
        default:
            return 'aspect-[16/9]';
    }
}


export const BackgroundImage: React.FC<BackgroundImageProps> = ({ imageUrl, aspectRatio }) => {
  const aspectRatioClass = getAspectRatioClass(aspectRatio);
  return (
    <div className="absolute inset-0 z-0 w-full h-full bg-black overflow-hidden">
      <div className={`w-full h-full ${aspectRatioClass} mx-auto`}>
        <img
          key={imageUrl}
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover animate-fade-in"
        />
      </div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
    </div>
  );
};

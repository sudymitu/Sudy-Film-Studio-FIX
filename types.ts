
import type React from 'react';

export type AspectRatio = '16:9' | '9:16' | '4:3' | '3:4' | '1:1';

export interface Project {
  id: number;
  codeName: string;
  title: string;
  image: string;
  backgroundImage: string;
  pitch: string;
  details: string;
  status: string;
  videoUrl?: string;
  thumbnailAspectRatio?: AspectRatio;
  backgroundAspectRatio?: AspectRatio;
}

export interface AiTool {
  id: number;
  name: string;
  description: string;
  link: string;
  icon: React.FC<{ className?: string }>;
}

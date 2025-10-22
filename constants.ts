
import type { Project, AiTool } from './types';
import { FilmIcon, CameraIcon, HomeIcon } from './components/Icons';
import type { TFunction } from './contexts/LanguageContext';


export const getDefaultProjects = (t: TFunction): Project[] => [
  {
    id: 1,
    codeName: t('projectCodeName'),
    title: 'DETONATION OF PINK ISLE',
    image: 'https://picsum.photos/seed/pinkisle-card/800/600',
    backgroundImage: 'https://picsum.photos/seed/pinkisle-bg/1920/1080',
    pitch: t('pinkIslePitch'),
    details: t('pinkIsleDetails'),
    status: t('statusInProduction'),
    videoUrl: 'https://vimeo.com/1129615682?fl=ip&fe=ec',
    thumbnailAspectRatio: '4:3',
    backgroundAspectRatio: '16:9',
  },
  {
    id: 2,
    codeName: t('codeName'),
    title: 'LADY OF INDOCHINA',
    image: 'https://picsum.photos/seed/indochina-card/800/600',
    backgroundImage: 'https://picsum.photos/seed/indochina-bg/1920/1080',
    pitch: t('indochinaPitch'),
    details: t('indochinaDetails'),
    status: t('statusReleased'),
    thumbnailAspectRatio: '4:3',
    backgroundAspectRatio: '16:9',
  },
  {
    id: 3,
    codeName: t('codeName'),
    title: 'DRACULA',
    image: 'https://picsum.photos/seed/dracula-card/800/600',
    backgroundImage: 'https://picsum.photos/seed/dracula-bg/1920/1080',
    pitch: t('draculaPitch'),
    details: t('draculaDetails'),
    status: t('statusReleased'),
    thumbnailAspectRatio: '4:3',
    backgroundAspectRatio: '16:9',
  },
  {
    id: 4,
    codeName: t('codeName'),
    title: 'UNDER THE SHADOW OF ASHES',
    image: 'https://picsum.photos/seed/ashes-card/800/600',
    backgroundImage: 'https://picsum.photos/seed/ashes-bg/1920/1080',
    pitch: t('ashesPitch'),
    details: t('ashesDetails'),
    status: t('statusConcept'),
    thumbnailAspectRatio: '4:3',
    backgroundAspectRatio: '16:9',
  },
   {
    id: 5,
    codeName: t('codeName'),
    title: 'NEON SAGE',
    image: 'https://picsum.photos/seed/neonsage-card/800/600',
    backgroundImage: 'https://picsum.photos/seed/neonsage-bg/1920/1080',
    pitch: t('neonSagePitch'),
    details: t('neonSageDetails'),
    status: t('statusConcept'),
    thumbnailAspectRatio: '4:3',
    backgroundAspectRatio: '16:9',
  },
];

export const getAiTools = (t: TFunction): AiTool[] => [
  {
    id: 1,
    name: 'SUDY MASTER SCRIPT',
    description: t('toolMasterScript'),
    link: 'https://ai.studio/apps/drive/1z5RKYHiB0doSbniRRSk-oOCeB8fTDhLJ',
    icon: FilmIcon,
  },
  {
    id: 2,
    name: 'SUDY MAGIC TOOL',
    description: t('toolMagicTool'),
    link: 'https://ai.studio/apps/drive/1fvOVAddGw7G5ZdRFs_8cgTNbTD4wRsB1',
    icon: CameraIcon,
  },
  {
    id: 3,
    name: 'SUDY ARCHITECTURE',
    description: t('toolArchitecture'),
    link: 'https://ai.studio/apps/drive/1uPpUx0cK1Ck7JxOoEQ_hqYI1dsITzDxg',
    icon: HomeIcon,
  }
];
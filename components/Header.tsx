
import React from 'react';
import type { Tab } from '../App';
import { Navigation } from './Navigation';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  return (
    <header className="text-center pt-8 md:pt-12 px-4">
      <h1 className="font-orbitron text-4xl md:text-5xl font-bold tracking-widest text-white uppercase">
        {t('studioName')}
      </h1>
      <div className="mt-4 w-24 h-1 bg-cyan-400 mx-auto rounded-full shadow-[0_0_15px_rgba(0,255,255,0.8)]"></div>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </header>
  );
};

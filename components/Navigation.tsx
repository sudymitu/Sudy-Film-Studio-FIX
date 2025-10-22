
import React from 'react';
import type { Tab } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TABS: Tab[] = ['Home', 'Projects', 'AI Tools', 'About', 'Contact'];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <nav className="mt-8 md:mt-12">
      <ul className="flex justify-center items-center space-x-2 md:space-x-8">
        {TABS.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => setActiveTab(tab)}
              className={`font-orbitron uppercase tracking-widest text-xs md:text-base px-3 py-2 rounded-md transition-all duration-300 relative
                ${activeTab === tab ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
            >
              {t(tab.toLowerCase().replace(' ', ''))}
              {activeTab === tab && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.7)]"></span>
              )}
            </button>
          </li>
        ))}
         <li className="absolute right-4 md:right-8">
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};


import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="text-center max-w-3xl mx-auto px-4 flex flex-col items-center justify-center h-full">
        <div>
            <h2 className="font-orbitron text-3xl font-bold text-white uppercase tracking-wider">{t('aboutTitle')}</h2>
            <div className="mt-4 w-16 h-1 bg-cyan-400 mx-auto rounded-full shadow-[0_0_15px_rgba(0,255,255,0.8)]"></div>
            <p className="mt-8 text-lg text-gray-300 leading-relaxed">
                {t('aboutText')}
            </p>
        </div>
    </section>
  );
};


import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="text-center max-w-3xl mx-auto px-4 flex flex-col items-center justify-center h-full">
        <div>
            <h2 className="font-orbitron text-3xl font-bold text-white uppercase tracking-wider">{t('contactTitle')}</h2>
            <div className="mt-4 w-16 h-1 bg-cyan-400 mx-auto rounded-full shadow-[0_0_15px_rgba(0,255,255,0.8)]"></div>
            <p className="mt-8 text-lg text-gray-300 leading-relaxed">
                {t('contactText')}
            </p>
            <a 
                href="mailto:contact@sudyfilm.studio" 
                className="font-orbitron text-xl text-cyan-400 mt-4 inline-block hover:text-cyan-300 transition-colors"
            >
                contact@sudyfilm.studio
            </a>
            <div className="mt-12">
                <p className="text-gray-400">{t('followText')}:</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Instagram</a>
                    <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">X (Twitter)</a>
                    <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Vimeo</a>
                </div>
            </div>
        </div>
    </section>
  );
};

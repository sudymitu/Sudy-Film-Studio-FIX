
import React from 'react';
import type { AiTool } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface AiToolsProps {
  tools: AiTool[];
}

export const AiTools: React.FC<AiToolsProps> = ({ tools }) => {
  const { t } = useLanguage();
  return (
    <section className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center h-full">
      <div>
        <h2 className="font-orbitron text-3xl font-bold text-white uppercase tracking-wider text-center">{t('aiToolkitTitle')}</h2>
        <div className="mt-4 w-16 h-1 bg-cyan-400 mx-auto rounded-full shadow-[0_0_15px_rgba(0,255,255,0.8)]"></div>
        <p className="mt-8 text-lg text-gray-300 leading-relaxed text-center max-w-3xl">
          {t('aiToolkitDescription')}
        </p>
      </div>

      <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 flex flex-col items-center text-center transform hover:scale-105 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
            <div className="bg-cyan-900/50 p-4 rounded-full">
                <tool.icon className="h-8 w-8 text-cyan-400" />
            </div>
            <h3 className="font-orbitron text-xl font-bold text-white mt-4">{tool.name}</h3>
            <p className="text-gray-400 mt-2 flex-grow">{tool.description}</p>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-cyan-500/20 text-cyan-300 font-semibold px-6 py-2 rounded-full border border-cyan-500/50 hover:bg-cyan-500/40 hover:text-white transition-colors"
            >
              {t('launchTool')}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

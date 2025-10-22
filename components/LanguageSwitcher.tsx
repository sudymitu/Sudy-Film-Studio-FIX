
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 bg-gray-900/50 border border-gray-700/50 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
          language === 'en' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('vi')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
          language === 'vi' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'
        }`}
      >
        VI
      </button>
    </div>
  );
};

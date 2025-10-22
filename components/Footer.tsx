import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="text-center py-6 border-t border-gray-800 w-full">
        <p className="text-gray-400">{t('founder')}: <span className="font-semibold text-white">Trương Điền Duy</span></p>
        <p className="text-gray-500 text-sm mt-2">{t('copyright', { year: new Date().getFullYear() })}</p>
        <div className="mt-3">
          <button
            onClick={() => window.location.hash = '#admin'}
            className="bg-transparent border-none p-0 text-xs text-gray-600 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Admin Login
          </button>
        </div>
    </footer>
  );
};
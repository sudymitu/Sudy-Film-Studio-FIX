
import type { Project } from '../types';
import { getDefaultProjects } from '../constants';
import type { TFunction } from '../contexts/LanguageContext';

const STORAGE_KEY = 'sudy-film-projects';

// Loads projects from localStorage or seeds initial data
export const loadProjects = (t: TFunction): Project[] => {
  try {
    const storedProjects = localStorage.getItem(STORAGE_KEY);
    if (storedProjects) {
      return JSON.parse(storedProjects);
    } else {
      const defaultProjects = getDefaultProjects(t);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
      return defaultProjects;
    }
  } catch (error) {
    console.error("Failed to load projects from localStorage:", error);
    // Fallback to default projects if localStorage is corrupt or unavailable
    return getDefaultProjects(t);
  }
};

// Saves the entire project list to localStorage
export const saveProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to save projects to localStorage:", error);
  }
};

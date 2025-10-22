import React, { useState } from 'react';
import type { Project } from '../../types';
import { ProjectEditModal } from './ProjectEditModal';

interface AdminDashboardProps {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, setProjects, onLogout }) => {
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);

    const handleSaveProject = (projectToSave: Project) => {
        let updatedProjects;
        if (isCreatingNew) {
            updatedProjects = [...projects, { ...projectToSave, id: Date.now() }];
        } else {
            updatedProjects = projects.map(p => p.id === projectToSave.id ? projectToSave : p);
        }
        setProjects(updatedProjects);
        closeModal();
    };
    
    const handleDeleteProject = (id: number) => {
        if(window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };
    
    const handleAddNew = () => {
        setIsCreatingNew(true);
        setEditingProject({
            id: -1,
            title: '',
            codeName: '',
            status: 'Concept',
            image: '',
            backgroundImage: '',
            pitch: '',
            details: '',
            thumbnailAspectRatio: '4:3',
            backgroundAspectRatio: '16:9'
        });
    }

    const closeModal = () => {
        setEditingProject(null);
        setIsCreatingNew(false);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-8">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 pb-4 border-b border-gray-700">
                <div className="mb-4 sm:mb-0">
                    <h1 className="font-orbitron text-2xl sm:text-3xl font-bold tracking-wider">Admin Dashboard</h1>
                    <p className="text-gray-400 text-sm sm:text-base">Manage your film projects.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => window.location.hash = '#'}
                        className="bg-transparent border-none p-0 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
                    >
                        View Live Site
                    </button>
                    <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                        Logout
                    </button>
                </div>
            </header>

            <div className="mb-8 text-right">
                <button onClick={handleAddNew} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                    + Add New Project
                </button>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th className="p-4 font-semibold">Thumbnail</th>
                                <th className="p-4 font-semibold">Title</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/30">
                                    <td className="p-4">
                                        <img src={project.image} alt={project.title} className="w-24 h-16 object-cover rounded-md"/>
                                    </td>
                                    <td className="p-4 font-orbitron font-bold">{project.title}</td>
                                    <td className="p-4">
                                        <span className="bg-gray-600 text-gray-300 text-xs font-semibold px-2 py-1 rounded-full">{project.status}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => setEditingProject(project)} className="text-cyan-400 hover:text-cyan-300 font-semibold mr-4">Edit</button>
                                        <button onClick={() => handleDeleteProject(project.id)} className="text-red-500 hover:text-red-400 font-semibold">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editingProject && (
                <ProjectEditModal
                    project={editingProject}
                    onClose={closeModal}
                    onSave={handleSaveProject}
                    isCreatingNew={isCreatingNew}
                />
            )}
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import type { Project, AspectRatio } from '../../types';
import { XIcon } from '../Icons';

interface ProjectEditModalProps {
    project: Project;
    onClose: () => void;
    onSave: (project: Project) => void;
    isCreatingNew: boolean;
}

const ASPECT_RATIOS: AspectRatio[] = ['16:9', '9:16', '4:3', '3:4', '1:1'];

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({ project, onClose, onSave, isCreatingNew }) => {
    const [formData, setFormData] = useState<Project>(project);

    useEffect(() => {
        setFormData(project);
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col">
                <header className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="font-orbitron text-2xl font-bold">
                        {isCreatingNew ? 'Create New Project' : 'Edit Project'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XIcon />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Column 1 */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Code Name</label>
                                <input type="text" name="codeName" value={formData.codeName} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Status</label>
                                <input type="text" name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Video URL (Optional)</label>
                                <input type="text" name="videoUrl" value={formData.videoUrl || ''} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Thumbnail Image URL</label>
                                <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                <label className="block text-xs font-bold text-gray-500 mt-2 mb-1">Thumbnail Aspect Ratio (Crop)</label>
                                <select name="thumbnailAspectRatio" value={formData.thumbnailAspectRatio} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                    {ASPECT_RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Background Image URL</label>
                                <input type="text" name="backgroundImage" value={formData.backgroundImage} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                <label className="block text-xs font-bold text-gray-500 mt-2 mb-1">Background Aspect Ratio (Crop)</label>
                                <select name="backgroundAspectRatio" value={formData.backgroundAspectRatio} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                    {ASPECT_RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Pitch</label>
                        <textarea name="pitch" value={formData.pitch} onChange={handleChange} rows={4} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Details</label>
                        <textarea name="details" value={formData.details} onChange={handleChange} rows={6} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                    </div>

                    <footer className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">Save Changes</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { GripVertical, Plus, Save , EditIcon } from 'lucide-react';


export function CourseEdit({ initialModules, onSave }) {
    const [modules, setModules] = useState(initialModules);
    const [draggedItem, setDraggedItem] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleDragStart = (index) => {
        setDraggedItem(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedItem === null) return;

        const newModules = [...modules];
        const draggedModule = newModules[draggedItem];
        newModules.splice(draggedItem, 1);
        newModules.splice(index, 0, draggedModule);

        // Update order numbers
        newModules.forEach((module, idx) => {
            module.order = idx;
        });

        setModules(newModules);
        setDraggedItem(index);
    };

    const handleDragEnd = () => {
        console.log(modules)
        setDraggedItem(null);
    };

    const handleAddModule = () => {
        if (!newTitle.trim()) return;

        const newModule = {
            id: crypto.randomUUID(),
            dato: newTitle,
            description: newDescription,
            order: modules.length,
        };

        setModules([...modules, newModule]);
        setNewTitle('');
        setNewDescription('');
    };

    const handleSave = () => {
        onSave(modules);
    };

    return (
        <div className="w-full  h-full mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-row">
                <section className='block'>
                    <h2 className="text-2xl font-bold mb-6">Module List</h2>

                    <div className="h-[45vh] space-y-2 mb-8 overflow-auto overflow-x-hidden">
                        {modules.map((module, index) => (
                            <div
                                key={index}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnd={handleDragEnd}
                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
                            >
                                <GripVertical className="text-gray-400" size={20} />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{module.dato}</h3>
                                    {module.description && (
                                        <p className="text-sm text-gray-600">{module.description}</p>
                                    )}
                                </div>
                                <EditIcon></EditIcon>
                            </div>
                        ))}
                    </div>
                </section>
                <section className='block'>
                    <div draggable className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-4">Add New Module</h3>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Module Title"
                            className="w-full p-2 border rounded-md"
                        />
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Module Description (optional)"
                            className="w-full p-2 border rounded-md"
                            rows={2}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo
                            </label>
                            <select
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                
                                onChange={(e) => {}}
                            >
                                <option value="">Selecciona un tipo</option>
                                <option value="development">Titulo principal</option>
                                <option value="design">Tema</option>
                                <option value="business">Subtema</option>
                                <option value="marketing">Examen</option>
                            </select>
                        </div>
                        <button
                            onClick={handleAddModule}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Plus size={16} />
                            Add Module
                        </button>
                    </div>

                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <Save size={16} />
                        Save Changes
                    </button>
                </section>
            </div>
        </div>
    );
}
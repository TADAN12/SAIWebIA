import React from 'react';
import { BookOpen, BookPlus } from 'lucide-react';

export function Navbar({ activeTab, onTabChange }) {
  const navItems= [
    { id: 'taking', label: 'Courses I\'m Taking', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'created', label: 'My Created Courses', icon: <BookPlus className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white shadow-sm mb-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors
                ${activeTab === item.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
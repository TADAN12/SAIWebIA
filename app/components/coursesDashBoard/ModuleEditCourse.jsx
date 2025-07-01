import React, { useState } from 'react';
import { CourseEdit } from './CourseEdit';

export default function MOduleEditCourse({titles}) {
    const [savedModules, setSavedModules] = useState(titles);
  
    const handleSave = (modules) => {
      setSavedModules(modules);
    };
  
    return (
      <div className=" bg-gray-100 ">
        <CourseEdit initialModules={savedModules} onSave={handleSave} />
      </div>
    );
  }
"use client"

import React, { useState } from 'react';
import { Navbar } from '../../components/coursesDashBoard/Navbar';
import { CoursesTaking } from '../../components/coursesDashBoard/CoursesTaking';
import { CoursesCreated } from '../../components/coursesDashBoard/CoursesCreated';

export default function Page() {
  const [activeTab, setActiveTab] = useState('taking');

  return (
    <div className=" bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto py-3 px-2">
          <h1 className="text-3xl font-bold text-gray-900">Course Dashboard</h1>
        </div>
      </header>

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className=" mx-auto ">
        {activeTab === 'taking' ? <CoursesTaking /> : <CoursesCreated />}
      </main>
    </div>
  );
}

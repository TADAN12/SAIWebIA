import React, { useEffect, useState } from 'react';
import { PlusCircle, EditIcon } from 'lucide-react';
import { CreateCourseForm } from './CreateCourseForm';
import MOduleEditCourse from './ModuleEditCourse';
import {gatewayHost,gatewayPort} from "../../../gateway.js"

export function CoursesCreated() {
  const [showForm, setShowForm] = useState(false);
  const [courses, setCoruses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function getOwnCourses() {
      let response = await fetch(`/api/contenido/getOwnCourses/1`, {
        credentials: "include"
      });

      let data = await response.json();
      if (data.error) return console.log(data.error);
      setCoruses(data);

    }
    getOwnCourses();

  }, [])

  return (
    <>
      {isEditing
        ?
        <MOduleEditCourse titles={courses[index].titles_initial} ></MOduleEditCourse>
        :
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Create Course
            </button>
          </div>

          <div className="flex flex-col overflow-auto overflow-x-hidden h-[60vh] ">
            {courses.map((course, index) => (
              <div key={course.id_course} className="bg-white rounded-lg shadow-md my-2 p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{course.course_name}</h3>
                  <section className='flex flex-col justify-between'>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded">
                      {course.scope}
                    </span>
                    <button onClick={() => { setIsEditing(true), setIndex(index) }}>
                      <EditIcon></EditIcon>
                    </button>
                  </section>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-sm text-gray-500">{"100"} enrolled students</p>
              </div>
            ))}
          </div>

          {showForm && <CreateCourseForm onClose={() => setShowForm(false)} />}
        </>
      }
    </>

  );
}
import React, { useEffect , useState } from 'react';
import { BookOpen, PlusCircle } from 'lucide-react';
import {gatewayHost,gatewayPort} from "../../../gateway.js"

const sampleCourses = [
  { id: '1', title: 'React Fundamentals', instructor: 'John Doe', progress: 60 },
  { id: '2', title: 'TypeScript Mastery', instructor: 'Jane Smith', progress: 30 },
  { id: '3', title: 'Node.js Advanced', instructor: 'Mike Johnson', progress: 45 },
];

export function CoursesTaking() {

  const [myCourses,setMyCourses] = useState([])

  useEffect(() => {

    async function fetchMyCourses() {
      
      let response = await fetch(`/api/contenido/getMyCourses/1`, {
        method:"GET",
        credentials: "include"
      })

      let data = await response.json();
      if(data.error) return console.log(data.error)
      setMyCourses(data)

    }

    fetchMyCourses()
    console.log(myCourses)
  },[])

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {}}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Loop up Courses
        </button>
      </div>
      <div className="flex flex-col overflow-auto overflow-x-hidden h-[65vh] mx-2">
        {myCourses.map((course) => (
          <div key={course.id_course} className="bg-white rounded-lg shadow-md p-6 my-2 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.course_name}</h3>
            <p className="text-gray-600 mb-4">Instructor: {course.scope}</p>
            <div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{100}% Complete</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
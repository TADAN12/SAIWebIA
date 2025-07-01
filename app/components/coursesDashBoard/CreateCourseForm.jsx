import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Upload } from 'lucide-react';
import {gatewayHost,gatewayPort} from "../../../gateway.js"

export function CreateCourseForm({ onClose }) {

  const doc = useRef();

  const [formInfo, setFormInfo] = useState({
    title: '',
    description: '',
    category: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formInfo);
    onClose();
  };

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white max-h-[80vh] rounded-lg p-6 w-full max-w-md overflow-auto overflow-x-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Create New Course</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formInfo.title}
              onChange={(e) => setFormInfo({ ...formInfo, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              value={formInfo.description}
              onChange={(e) => setFormInfo({ ...formInfo, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formInfo.category}
              onChange={(e) => setFormInfo({ ...formInfo, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <section>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload content (optional)
            </label>
            <div className='flex justify-center mt-3'>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">TXT, PDF, DOC or DOCX (MAX. 10MB)</p>
                </div>
                <input

                  ref={doc}
                  type="file"
                  name="fileQuiz"
                  className="hidden"
                  accept=".doc,.docx"

                />
              </label>
            </div>

          </section>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              onClick={() => { createCourse(doc,formInfo) }}
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function createCourse(doc,formInfo) {

  let file = doc.current.files[0];
  if (file) {
    createCourseFromWord(file,formInfo)
  } else {
    createCourseFromScratch(formInfo)
  }

}

async function createCourseFromWord(file,formInfo) {
  
  let formData = new FormData();

  formData.append( "file",file);
  formData.append("title",formInfo.title);
  formData.append("description",formInfo.description);
  formData.append("category",formInfo.category);

  let response = await fetch(`/api/contenido/saveCourseFromWord/1`, {
    method:"POST",
    body:formData,
    credentials:"include"
  })

  let data = await response.json()
  if(data.error) return console.log(data.error)
  return console.log(data.message)

}

async function createCourseFromScratch() {



}
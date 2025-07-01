import { X } from 'lucide-react';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import {gatewayHost,gatewayPort} from "../../../gateway.js"

export function ModalNotes({ setIsModalOpen }) {

  const [formInfo, setFormInfo] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [title, setTitle] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setIsModalOpen(false);
    fetch(`/api/notas/saveNota/${-1}`, { // doesnt find a note with index -1 to force create a new note 
      method: "POST",
      body:JSON.stringify({
        title_note:title
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return response.json();
      })
      .then(data => {
        if (data.error) return console.log(data)
        console.log(data.message)
      })
      .catch(error => console.error("Fetch error:", error))
  };

  const handleClose = () => {
    console.log('Close button clicked');
    if (typeof setIsModalOpen === 'function') {
      setIsModalOpen(false);
      console.log('setIsModalOpen called with false');
    } else {
      console.log('setIsModalOpen is not a function');
    }
  };
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white max-h-[80vh] rounded-lg p-6 w-full max-w-md overflow-auto overflow-x-hidden">
        <section className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Create New Course</h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
          <button type="submit">
            Crear
          </button>


        </form>
      </div>
    </div>
  );
}
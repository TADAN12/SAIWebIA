


export default function CreateNoteModal() {

    return (
        <div className="flex items-center justify-center min-h-screen">

            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <div className=' flex flex-row '>
                        <h2 className="text-xl font-bold mb-4">¿Como quieres nombrar a tu nota?</h2>
                        <button className='bg-red-500 p-2 w-[15%] h-[15%]  rounded-xl t-0 ml-5 mb-10 '
                            onClick={() => {
                                setIsModalOpen(false)
                            }}
                        > X</button>
                    </div>
                    <div className='flex justify-between'>

                        <input className="border-2 border-black rounded-md"
                            type="text"
                            value={noteName}
                            onChange={(e) => {
                                setNoteName(e.target.value)
                            }}
                        />
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                setIsModalOpen(false)
                                if (noteName.length === 0) return;
                                setNotes(prev => [...prev, noteName])
                                setNoteName("");
                            }}
                        >
                            Crear
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )

}

import React, { useState } from 'react'



const Todolist = ({notes, deleteNote, openModal}) => {
  
  return (
    <div>
      {notes.map(note => (
        <li key={note.id} className="border-b border-gray-600 p-2">
        <div className="flex justify-between">
          <div className="flex-1">
            <h3 className="font-bold">{note.title}</h3>
            <p className="text-sm">{note.content}</p>
          </div>
          <button onClick={() => openModal(note.id)} className='bg-blue-500 px-3 text-white rounded'>Обновить</button>
          <button onClick={() => deleteNote(note.id)} className='bg-red-500 px-3 ml-3 text-white rounded'>X</button>
        </div>
        </li>
      ))}
    </div>
  )
}

export default Todolist
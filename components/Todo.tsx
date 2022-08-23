import React, { useState } from 'react'

interface NoteProps {
  note: {
    title: string
    id: number
    content: string
    completed: boolean
  }
  deleteNote: Function
  openModal: Function
}

const Todo = ({ note, deleteNote, openModal }: NoteProps) => {
  const [completed, setCompleted] = useState(note.completed)
  console.log(note)

  function handleModal(e: any) {
    e.stopPropagation()
    openModal(note.id)
  }

  function handleDelete(e: any) {
    e.stopPropagation()
    deleteNote(note.id)
  }

  return (
    <li
      key={note.id}
      onClick={() => setCompleted(!completed)}
      className={`border-b border-gray-600 p-2 m-2 ${
        completed ? 'bg-green-300' : 'bg-orange-300'
      }`}
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <h3 className="font-bold">{note.title}</h3>
          <p className="text-sm">{note.content}</p>
        </div>
        <button
          onClick={handleModal}
          className="bg-blue-500 px-3 text-white rounded"
        >
          Обновить
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 px-3 ml-3 text-white rounded"
        >
          X
        </button>
      </div>
    </li>
  )
}

export default Todo

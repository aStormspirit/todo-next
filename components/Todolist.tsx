import React from 'react'
import Todo from './Todo'

interface Note {
  title: string
  id: number
  content: string
  completed: boolean
}

interface NoteProps {
  notes: [Note]
  deleteNote: Function
  openModal: Function
}

const Todolist = ({ notes, deleteNote, openModal }: NoteProps) => {
  return (
    <div>
      {notes.map((note: Note) => {
        if (note.title.length > 50) {
          note.title = note.title.slice(0, 50)
          note.title += '...'
        }

        if (note.content.length > 50) {
          note.content = note.title.slice(0, 50)
          note.content += '...'
        }

        return (
          <Todo
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            openModal={openModal}
          />
        )
      })}
    </div>
  )
}

export default Todolist

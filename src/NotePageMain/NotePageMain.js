import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NotefulContext from '../NotefulContext';
import { findNote } from '../notes-helpers'

export default class NotePageMain extends React.Component {
  static contextType = NotefulContext;
  render() {
    const note = findNote(this.context.notes, this.props.match.params.id)
    if (!note) {
      return <div>Loading..</div>
    }

    return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        note_name={note.note_name}
        modified={note.modified}
        folder={note.folder}
        content={note.note_content}
      />
      <div className='NotePageMain__content'>
        {note.note_content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}

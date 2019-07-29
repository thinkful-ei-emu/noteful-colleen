import React from 'react'
import './NotePageMain.css'
import NotefulContext from '../NotefulContext';
import { findNote } from '../notes-helpers'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Note/Note.css'

export default class NotePageMain extends React.Component {
  static contextType = NotefulContext;

  handleDeleteNote(event, noteId) {
    event.preventDefault()
    console.log(this.props)
    fetch(`http://localhost:8000/api/note/${noteId}`,{
      method: 'DELETE',
      //headers: {'content-type': 'application/json'},
    })
    .then(res => {
      if (!res.ok) {
        return res.status().then(error => {
          throw error;
        });
      }
      return res.status();
    })
    
    .catch(error => {
      this.setState({ error });
    });
    this.context.deleteNote(noteId)
    this.context.getNotes()
    this.props.history.push('/')
   
  }

  render() {
    const note = findNote(this.context.notes, this.props.match.params.noteId)
    
    if (!note) {
      return <div>Loading..</div>
    }

    return (
      
    <section className='NotePageMain'>
   <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${note.id}`}>
          {note.note_name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={(e) => this.handleDeleteNote(e, note.id)}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <Link to={`/update-note/${note.id}`}>
      <button className="note_modify" type='button'>Modify note</button>
      </Link>
     
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(note.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
      <div className='NotePageMain__content'>
        {note.note_content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>

    </section>
  )
}
}

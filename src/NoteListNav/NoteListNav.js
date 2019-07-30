import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import NotefulContext from '../NotefulContext'
import './NoteListNav.css'
import config from '../config'
export default class NoteListNav extends React.Component {
  static contextType = NotefulContext
  handleDeleteFolder(event, folderId) {
    event.preventDefault()
    fetch(`${config.API_ENDPOINT}/api/folder/${folderId}`,{
      method: 'DELETE',
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
    this.context.deleteFolder(folderId)
    
   
  }

  render () {
  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {this.context.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(this.context.notes, folder.id)}
              </span>
              {folder.folder_name}<br/>
              <button className="deletefolderbutton" type='button' onClick={(e) => this.handleDeleteFolder(e, folder.id)}>
        delete folder
      </button>
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
        <CircleButton
          tag={Link}
          to='/rename-folder'
          type='button'
          className='NoteListNav__change-button'
          >
          Edit Folder
        </CircleButton>
      </div>
    </div>
  )
}
}

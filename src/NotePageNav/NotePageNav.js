import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  
  render(){
  return (
    <div className='NotePageNav'>
      <div className='NotePageNav__button-wrapper'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      </div>
      {this.props.folder && (
        <h3 className='NotePageNav__folder-name'>
          {this.props.folder.name}
        </h3>
      )}
    </div>
  )
}
}


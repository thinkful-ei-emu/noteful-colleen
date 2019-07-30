import React from 'react'
import NotefulContext from '../NotefulContext'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import './Note.css'




 export default class Note extends React.Component {
  static contextType = NotefulContext 

  
  render(){
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${this.props.id}`}>
          View note: {this.props.note_name}
        </Link>
      </h2>
 
    
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
}

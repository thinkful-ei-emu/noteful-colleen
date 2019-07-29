import React from 'react'

const NotefulContext = React.createContext({
  notes : [],
  folders: [],
  deleteNote: ()=>{},
  addNote: ()=>{},
  getNotes: ()=>{},
  deleteFolder: ()=>{}
})

export default NotefulContext
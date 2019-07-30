import React from 'react'

const NotefulContext = React.createContext({
  notes : [],
  folders: [],
  deleteNote: ()=>{},
  addNote: ()=>{},
  getNotes: ()=>{},
  deleteFolder: ()=>{},
  addFolder: ()=>{},
  renameFolder: ()=>{}
})

export default NotefulContext
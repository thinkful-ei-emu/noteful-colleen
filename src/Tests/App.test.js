import React from 'react'
import ReactDOM from 'react-dom'
import NotefulContext from "../NotefulContext";
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble
} from '@fortawesome/free-solid-svg-icons'
import App from '../App/App'

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
     <NotefulContext.Provider
        value={{
          notes: [],
          folders: [],
          deleteNote: ()=>{},
          deleteFolder: ()=>{},
          addNote: ()=>{},
          addFolder: ()=>{},
          renameFolder: ()=>{},
          getNotes: ()=>{},
        }}
      >
      <App />
        
      </NotefulContext.Provider>
  
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})

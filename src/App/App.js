import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotefulContext from "../NotefulContext";
import NoteAddForm  from '../NotefulForm/NoteAddForm';
import NoteUpdateForm from '../NotefulForm/NoteModifyForm';
import FolderAddForm from '../NotefulForm/FolderAddForm';
import FolderRenameForm from '../NotefulForm/FolderRenameForm'
import MainError from '../MainError';
import NavError from '../NavError';
import config from '../config';

import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: false,
    errorMessage: '',
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);

    this.setState({
      notes: newNotes
    });
  };
  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }
  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }
  renameFolder = (folderId, newName) => {
    const newFolders = this.state.folders.filter(folder=> folder.id != folderId)
    const changeFolder = this.state.folders.filter(folder=> folder.id == folderId)
    console.log(changeFolder)
    changeFolder[0].folder_name = newName
    this.setState({
      folders: [...newFolders, changeFolder]
    })
  }
  deleteFolder = folderId => {
    const newFolders = this.state.folders.filter(folder => folder.id !== folderId)
    this.setState({
      folders: newFolders
    })
  }
  getNotes = ()=>{
    fetch(`${config.API_ENDPOINT}/api/folder`)
        .then(res=> 
          {if(!res.ok){
            return res.json().then(error => {
              throw error});
            }
            return res.json();
          })
        .then(folders => this.setState({
            folders: folders
        }))
        .catch(error =>
          { this.setState({error: true, errorMessage: 'Failed to access the notes'
          })
         })
        fetch(`${config.API_ENDPOINT}/api/note/`)
        .then(res=> 
          {if(!res.ok){
            return res.json().then(error => {
              throw error});
            }
            return res.json();
          })
        .then(notes => this.setState({
            notes: notes
        }))
      
      .catch(error =>
        { this.setState({error: true, errorMessage: 'Error: Failed to access the notes'
          })
          })
  
  }
  componentDidMount() {
    
    fetch(`${config.API_ENDPOINT}/api/folder/`)
        .then(res=> 
          {if(!res.ok){
            return res.json().then(error => {
              throw error});
            }
            return res.json();
          })
        .then(folders => this.setState({
            folders: folders
        }))
        .catch(error =>
          { this.setState({error: true, errorMessage: 'Failed to access the notes'
          })
         })
        fetch(`${config.API_ENDPOINT}/api/note/`)
        .then(res=> 
          {if(!res.ok){
            return res.json().then(error => {
              throw error});
            }
            return res.json();
          })
        .then(notes => this.setState({
            notes: notes
        }))
      
      .catch(error =>
        { this.setState({error: true, errorMessage: 'Error: Failed to access the notes'
          })
          })
  }

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <>
          <Route exact key={path} path={path} component={NoteListNav} />
          <Route exact key={path} path={path} component={NotePageNav} />
          </>
        ))}
        <Route key='add-folder' path="/add-folder" component={FolderAddForm} />
        <Route key ='rename-folder' path="/rename-folder" component={FolderRenameForm} />
        <Route key='add-note' path="/add-note" component={NoteAddForm} />
        {["/update-note/:id"].map(path=> (
          <Route key={path} component={NoteUpdateForm} />
        ))}
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        {["/note/:noteId"].map(path=>
        (<Route key={path} path="/note/:noteId" component={NotePageMain} />
          ))}
        
      </>
    );
  }

  render() {
    if (this.state.error){return (<>
    <header className="App__header">
    <h1>
      <Link to="/">Noteful</Link>{" "}
      <FontAwesomeIcon icon="check-double" />
    </h1>
    </header>
    <div>{this.state.errorMessage}</div></>)}
    return (
      <NotefulContext.Provider
        value={{
          notes: this.state.notes,
          folders: this.state.folders,
          deleteNote: this.deleteNote,
          deleteFolder: this.deleteFolder,
          addNote: this.addNote,
          addFolder: this.addFolder,
          renameFolder: this.renameFolder,
          getNotes: this.getNotes,
        }}
      >
        <div className="App">
          <NavError>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          </NavError>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <MainError>
          <main className="App__main">{this.renderMainRoutes()}</main>
          </MainError>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;

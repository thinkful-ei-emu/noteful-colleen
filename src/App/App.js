import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotefulContext from "../NotefulContext";
import NoteAddForm  from '../NotefulForm/NoteAddForm';
import FolderAddForm from '../NotefulForm/FolderAddForm';
import MainError from '../MainError';
import NavError from '../NavError'

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
  getNotes = ()=>{
    fetch('http://localhost:8000/api/folder')
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
        fetch('http://localhost:8000/api/note')
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
    
    fetch('http://localhost:8000/api/folder')
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
        fetch('http://localhost:8000/api/note')
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
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={FolderAddForm} />
        <Route path="/add-note" component={NoteAddForm} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
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
          addNote: this.addNote,
          addFolder: this.addFolder,
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

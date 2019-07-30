import React from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from "./ValidationError";
import './NotefulForm.css'
import config from '../config'
class NoteUpdateForm extends React.Component {
  state = {
    title: {value: "", touched: false},
    description: {value:"", touched: false},
    folders: {value:"", touched: false}
  };

  static contextType = NotefulContext;

  onTitleChange(title) {
   
    this.setState({
      title: {value: title,
      touched: true}
    });
  };
  onDescriptionChange = e => {
    this.setState({
      description: {value: e.target.value, 
      touched: true}
    });
  };
  onFolderSelect = e => {
    this.setState({
      folders: {value: e.target.value, touched:true }
    });
  };

  validateForm() {
    const name = this.state.title.value;
    const description =this.state.description.value;
    const folders=this.state.folders.value;
    if (name === "" || description === "" || folders === "") {
      return "Need to supply at least one field to update";
    } else if (name.length < 2){
      return "Name must be greater than 2 characters"
    }
  }
  handleForm = e => {
    e.preventDefault();
    const id = this.props.match.params.id
    const { title, description, folders } = e.target;
    const note = {
      note_name: title.value,
      note_content: description.value,
      folder: folders.value,
      modified: new Date()
    };
    let updateNote = {modified: new Date()};
    if(note.note_name){
      updateNote ={ ...updateNote, note_name: note.note_name}
    }
    if(note.note_content){
      updateNote ={ ...updateNote, note_content: note.note_content}
    }
    if(note.folder){
      updateNote={...updateNote, folder: note.folder}
    }
     ;
    fetch(`${config.API_ENDPOINT}/api/note/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateNote),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.status.then(error => {
            throw error;
          });
        }
        return true;
      })
      .then(() => {
        title.value = "";
        description.value = "";
        folders.value="";
        this.context.getNotes();
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const nameError = this.validateForm()
    const folderChoice = this.context.folders.map((folder, index) => (
      <>
        <label>
          {folder.folder_name}{" "}
          <input
            key={index}
            name="folders"
            type="radio"
            value={folder.id}
            onChange={this.onFolderSelect}
            
          />
        </label>
      </>
    ));
    return (
      <div>
        <form onSubmit={this.handleForm}>
          <h1 className="form_title">Modify Note</h1>
          <label>Update Folder:</label>
          {folderChoice}
          <label htmlFor="title">Change Name:</label>
          <input name="title" type="text" onChange={e=>this.onTitleChange(e.target.value)} />
          {(this.state.title.touched || this.state.description.touched || this.state.folders.touched)&& (
            <ValidationError message={nameError} />
          )}
          <label htmlFor="description">Change Description:</label>

          <textarea
            name="description"
            type="text"
            onChange={this.onDescriptionChange}
          />
          <button type="submit">Modify Note</button>
        </form>
      </div>
    );
  }
}
export default NoteUpdateForm;

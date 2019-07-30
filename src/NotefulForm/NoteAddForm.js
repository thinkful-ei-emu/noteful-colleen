import React from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from "./ValidationError";
import config from '../config'
import './NotefulForm.css'
class NoteAddForm extends React.Component {
  state = {
    title: {value: "", touched: false},
    description: "",
    folders: ""
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
      description: e.target.value
    });
  };
  onFolderSelect = e => {
    this.setState({
      folders: e.target.value
    });
  };

  validateName() {
    const name = this.state.title.value;
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 2){
      return "Name must be greater than 2 characters"
    }
  }
  handleForm = e => {
    e.preventDefault();
    const { title, description, folders } = e.target;
    const note = {
      note_name: title.value,
      note_content: description.value,
      folder: folders.value,
      modified: new Date()
    };
    fetch(`${config.API_ENDPOINT}/api/note`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        title.value = "";
        description.value = "";
        folders.value="";
        this.context.addNote(data);
        this.context.getNotes();
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const nameError = this.validateName()
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
            required
          />
        </label>
      </>
    ));
    return (
      <div>
        <form onSubmit={this.handleForm}>
          <h1 className="form_title">Add Note</h1>
          <label>Select Folder:</label>
          {folderChoice}
          <label htmlFor="title">Name:</label>
          <input name="title" type="text" onChange={e=>this.onTitleChange(e.target.value)} />
          {this.state.title.touched && (
            <ValidationError message={nameError} />
          )}
          <label htmlFor="description">Description:</label>

          <textarea
            name="description"
            type="text"
            onChange={this.onDescriptionChange}
          />
          <button type="submit" disabled={this.validateName()}>Add Note</button>
        </form>
      </div>
    );
  }
}
export default NoteAddForm;

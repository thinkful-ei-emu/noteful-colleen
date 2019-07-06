import React from "react";
import NotefulContext from "../NotefulContext";
import cuid from "cuid";
import ValidationError from "./ValidationError";

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
    console.log('description changed')
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
      name: title.value,
      content: description.value,
      folderId: folders.value,
      id: cuid(),
      modified: new Date()
    };
    fetch("http://localhost:9090/notes", {
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
        console.log(data);
        title.value = "";
        description.value = "";
        console.log(this.context);
        this.context.addNote(data);
        console.log(this.props.history);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
  };

  render() {
    const nameError = this.validateName()
    const folderChoice = this.context.folders.map((folder, index) => (
      <>
        <label>
          {folder.name}{" "}
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

import React from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from './ValidationError'
import config from '../config'
class FolderRenameForm extends React.Component {
  state = {
    title: "",
    touched: false,
    id: ""
  };

  static contextType = NotefulContext;
  onFolderSelect = e => {
    this.setState({
      id: e.target.value
    });
  };
  onTitleChange = e => {
    this.setState({
      title: e.target.value,
      touched: true
    });
  };
  validateTitle() {
    const name = this.state.title;
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 2){
      return "Name must be greater than 2 characters"
    }
  }
  
  handleForm = e => {
    e.preventDefault();
    const title = this.state.title
    const id = this.state.id
    const folder = {folder_name : title};

        fetch(`${config.API_ENDPOINT}/api/folder/${id}`, {
      method: "PATCH",
      body: JSON.stringify(folder),
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
      return res.status;
    })
    .then(()=>{
      
      this.context.renameFolder(id, title)
      this.context.getNotes()
      this.props.history.push('/')
      
    })
    
    .catch(error => {
      this.setState({ error });
    });
    
    
  };

  render() {
    const nameError = this.validateTitle()
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
        <form onSubmit={e=>{this.handleForm(e)}}>
          <label>Choose Folder To Modify</label>
          {folderChoice}
          <label htmlFor="title">Update Folder Name:</label>
          <input name="title" type="text" required onChange={e=>{this.onTitleChange(e)}} />
          {this.state.touched && (
            <ValidationError message={nameError} />
          )}
          <button type='submit'>Update Folder</button>
          <button onClick={e=>this.props.history.goBack()}>Go Back</button>
        </form>
      </div>
    );
  }
}
export default FolderRenameForm;

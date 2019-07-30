import React from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from './ValidationError'
import config from '../config'
class FolderAddForm extends React.Component {
  state = {
    title: "",
    touched: false
  
  };

  static contextType = NotefulContext;

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
    
    const folder = {folder_name : title};

        fetch(`${config.API_ENDPOINT}/api/folder`, {
      method: "POST",
      body: JSON.stringify(folder),
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
        this.context.getNotes();
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const nameError = this.validateTitle()
    return (
      <div>
        <form onSubmit={e=>{this.handleForm(e)}}>
          <label htmlFor="title">Name:</label>
          <input name="title" type="text" onChange={e=>this.onTitleChange(e)} />
          {this.state.touched && (
            <ValidationError message={nameError} />
          )}
          <button type='submit'>Add Folder</button>
          <button onClick={e=>this.props.history.goBack()}>Go Back</button>
        </form>
      </div>
    );
  }
}
export default FolderAddForm;

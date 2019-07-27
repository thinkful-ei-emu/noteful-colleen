import React from "react";
import NotefulContext from "../NotefulContext";
import cuid from "cuid";
import ValidationError from './ValidationError'

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

        fetch("http://localhost:8000/api/folder", {
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
        console.log(data);
        title.value = "";  
        this.context.addFolder(data);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
  };

  render() {
    const nameError = this.validateTitle()
    return (
      <div>
        <form onSubmit={e=>{this.handleForm(e)}}>
          <label htmlFor="title">Name:</label>
          <input name="title" type="text" onChange={e=>{this.onTitleChange(e)}} />
          {this.state.touched && (
            <ValidationError message={nameError} />
          )}
          <button type='submit'>Add Folder</button>
        </form>
      </div>
    );
  }
}
export default FolderAddForm;

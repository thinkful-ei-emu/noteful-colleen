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
    const { title } = e.target;
    const note = {
      name: title.value,
      id: cuid(),
    };
    fetch("http://localhost:9090/folders", {
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
        <form onSubmit={this.handleForm}>
          <label htmlFor="title">Name:</label>
          <input name="title" type="text" onChange={this.onTitleChange} />
          {this.state.touched && (
            <ValidationError message={nameError} />
          )}
          <button disabled={this.validateTitle()}>Add Folder</button>
        </form>
      </div>
    );
  }
}
export default FolderAddForm;

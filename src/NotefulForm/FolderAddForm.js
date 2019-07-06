import React from "react";
import NotefulContext from "../NotefulContext";
import cuid from "cuid";

class FolderAddForm extends React.Component {
  state = {
    title: "",
  
  };

  static contextType = NotefulContext;

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
 
  
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
    
    return (
      <div>
        <form onSubmit={this.handleForm}>
          <label htmlFor="title">Name:</label>
          <input name="title" type="text" onChange={this.onTitleChange} />
          <button>Add Folder</button>
        </form>
      </div>
    );
  }
}
export default FolderAddForm;

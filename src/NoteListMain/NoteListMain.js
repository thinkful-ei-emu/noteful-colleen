import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import NotefulContext from "../NotefulContext";
import "./NoteListMain.css";
import { getNotesForFolder } from '../notes-helpers'
import propTypes from 'prop-types'

export default class NoteListMain extends React.Component {
  static contextType = NotefulContext;
  render() {
    return (
      <section className="NoteListMain">
        <ul>
          {this.props.match.path === "/"
            ? this.context.notes.map(note => (
                <li key={note.id}>
                  <Note
                    id={note.id}
                    note_name={note.note_name}
                    note_content={note.note_content}
                    modified={note.modified}
                    folder={note.folder}
                  />
                </li>
              ))
            : 
                (getNotesForFolder(this.context.notes, this.props.match.params.folderId))
                .map(note => (
                  <li key={note.id}>
                    <Note
                      id={note.id}
                      note_name={note.note_name}
                      note_content={note.note_content}
                      modified={note.modified}
                      folder={note.folder}
                    />
                  </li>
                ))}
        </ul>
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}


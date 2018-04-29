import React, { Component } from 'react';
// import RichTextEditor from 'react-rte';
// import { Editor, EditorState } from 'draft-js';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import base from '../base';

class Note extends Component {
  state = {
    note: {
      // text: EditorState.createEmpty()
      text: EditorState.createEmpty()
    }
  };

  onChange = value => {
    debugger
    console.log(value);
    const { note } = this.state;
    note.text = value;
    this.setState({ note });
  };

  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   this.ref = base.syncState(`/notes/${id}`, {
  //     context: this,
  //     state: 'note'
  //   });
  // }

  // handleChange = input => {
  //   const { note } = this.state;
  //   note.text = input.target.value;
  //   this.setState({ note });
  // };

  // onChange = value => {
  //   // debugger
  //   // console.log(value);
  //   // const { note } = this.state;
  //   // note.text = value.toString('markdown');
  //   // console.log(note);
  //   // this.setState({ note });
  //   // if (this.props.onChange) {
  //   //   console.log(value);
  //   //   // Send the changes up to the parent component as an HTML string.
  //   //   // This is here to demonstrate using `.toString()` but in a real app it
  //   //   // would be better to avoid generating a string on each change.
  //   //   // debugger
  //   //   // this.props.onChange(value.toString('markdown'));
  //   // }
  // };

  render() {
    const { note } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="form-group">
              {/* <textarea
                className="form-control"
                value={note.text}
                cols="30"
                rows="4"
                onChange={input => this.handleChange(input)}
              /> */}
              {/* <RichTextEditor
                value={this.state.note.text}
                onChange={this.onChange}
              /> */}
              {/* <Editor
                editorState={note.text}
                onChange={this.onChange}
              /> */}
              <Editor
                editorState={note.text}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
// import { Editor, EditorState } from 'draft-js';
// import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';

import base from '../base';

class Note extends Component {
  state = {
    note: {
      text: ''
      // text: EditorState.createEmpty()
    },
    editorState: RichTextEditor.createEmptyValue()
  };

  onChange = editorState => {
    this.setState({
      editorState,
      note: {
        text: editorState.toString('markdown')
      }
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.ref = base.syncState(`/notes/${id}`, {
      context: this,
      state: 'note',
      then() {
        const { text } = this.state.note;
        this.setState({
          editorState: RichTextEditor.createValueFromString(text, 'markdown')
        });
      }
    });

    base.listenTo(`/notes/${id}`, {
      context: this,
      then(note) {
        console.log(note.text, this.state.note.text);
        const { text } = note;
        const { editorState } = this.state;
        editorState.setContentFromString(text, 'markdown');
        // this.setState({
        //   editorState: editorState.setContentFromString(text, 'markdown')
        //   // editorState: RichTextEditor.createValueFromString(text, 'markdown')
        // });
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    // debugger
    // console.log(nextState);
    // const { text } = nextState.note;
    // const currentText = this.state.note.text;
    // // console.log(text, currentText);
    // // // only update editor if new text is different
    // if (text !== currentText) {
    //   const { editorState } = this.state;
    //   // this.setState({
    //   //   editorState: editorState.setContentFromString(text, 'markdown')
    //   // });
    // }
  }

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
              <RichTextEditor
                value={this.state.editorState}
                onChange={this.onChange}
              />
              {/* <Editor
                editorState={note.text}
                onChange={this.onChange}
              /> */}
              {/* <Editor
                editorState={note.text}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onChange}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;

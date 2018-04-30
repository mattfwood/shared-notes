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
        debugger
        const { text } = this.state.note;
        console.log(text);
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
        const currentText = this.state.note.text;
        const { editorState } = this.state;
        if (text === currentText) {
          this.setState({
            editorState: editorState.setContentFromString(text, 'markdown')
          });
        }
      }
    });
  }

  render() {
    const { note } = this.state;

    // const toolbarConfig = {
    //   // Optionally specify the groups to display (displayed in the order listed).
    //   display: [
    //     'INLINE_STYLE_BUTTONS',
    //     'BLOCK_TYPE_BUTTONS',
    //     'LINK_BUTTONS',
    //     'BLOCK_TYPE_DROPDOWN',
    //     'HISTORY_BUTTONS'
    //   ],
    //   INLINE_STYLE_BUTTONS: [
    //     { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    //     { label: 'Italic', style: 'ITALIC' },
    //     { label: 'Underline', style: 'UNDERLINE' }
    //   ],
    //   BLOCK_TYPE_DROPDOWN: [
    //     { label: 'Normal', style: 'unstyled' },
    //     { label: 'Heading Large', style: 'header-one' },
    //     { label: 'Heading Medium', style: 'header-two' },
    //     { label: 'Heading Small', style: 'header-three' }
    //   ],
    //   BLOCK_TYPE_BUTTONS: [
    //     { label: 'UL', style: 'unordered-list-item' },
    //     { label: 'OL', style: 'ordered-list-item' }
    //   ]
    // };
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

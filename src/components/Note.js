import React, { Component } from 'react';
import base from '../base';

class Note extends Component {
  state = {
    note: {},
  }
  componentDidMount() {
    const { id } = this.props;
    this.ref = base.syncState(`/notes/${id}`, {
      context: this,
      state: 'note',
    });
  }

  render() {
    const { note } = this.props;
    return (
      <div className="form-group">
        <textarea className="form-control" value={note.text} cols="30" rows="4" onChange={(input) => this.props.handleChange(input, this.props.noteId)} />
      </div>
    );
  }
}

export default Note;
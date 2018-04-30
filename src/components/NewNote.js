import React, { Component } from 'react';
import base from '../base';

class Note extends Component {
  state = {
    note: {
      text: ''
    }
  };

  handleChange = (input) => {
    console.log(input);
    const { note } = this.state;
    note.text = input.target.value;
    this.setState({ note });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.ref = base.syncState(`/notes/${id}`, {
      context: this,
      state: 'note'
    });
  }

  render() {
    const { note } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="form-group">  
              <textarea
                className="form-control"
                value={note.text}
                cols="30"
                rows="4"
                onChange={input => this.handleChange(input)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;

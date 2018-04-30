import React, { Component } from 'react';
import base from './base';
import './App.css';
import { Redirect } from 'react-router-dom';

import Note from './components/Note';
const Puid = require('puid');

class App extends Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    // if (this.props.user) {
    this.ref = base.syncState(`/notes`, {
      context: this,
      state: 'notes',
    });
    // } else {
    //   <Redirect to={{
    //     pathname: '/',
    //     state: { from: this.props.location }
    //   }}/>
    // }
  }

  handleChange = (input, key) => {
    console.log('input changed');
    const { notes } = this.state;
    notes[key].text = input.target.value;
    this.setState({ notes });
  };

  createNote = () => {
    // const notes = this.state.notes;
    // const puid = new Puid();
    // const newId = puid.generate();
    // notes[newId] = {
    //   text: '',
    // };
    // this.setState({ notes });
    base
      .push('notes', {
        data: {
          text: '',
        },
      })
      .then(note => {
        const key = note.key;
        console.log(key);
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const notes = Object.entries(this.state.notes);
    return (
      <div className="App container">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-row-reverse">
              <button className="btn btn-primary mt-5 mb-5" onClick={() => this.createNote()}>New Note</button>
            </div>
          </div>
        </div>
        {notes.map(note => {
          const [key, details] = note;
          return (
            <Note
              key={key}
              noteId={key}
              note={details}
              createNote={this.createNote}
              handleChange={this.handleChange}
            />
          );
        })}
      </div>
    );
  }
}

export default App;

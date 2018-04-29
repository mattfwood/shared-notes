import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import base from './base';
import './App.css';

class App extends Component {
  state = {
    notes: []
  };

  componentDidMount() {
    // if (this.props.user) {
    this.ref = base.syncState('/notes', {
      context: this,
      state: 'notes'
    });
    // } else {
    //   <Redirect to={{
    //     pathname: '/',
    //     state: { from: this.props.location }
    //   }}/>
    // }
  }

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
          text: ''
        }
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
              <button
                className="btn btn-primary mt-5 mb-5"
                onClick={() => this.createNote()}
              >
                New Note
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {notes.map(note => {
            const [key, details] = note;
            return (
              <div className="col-md-6 note-preview-wrapper" key={key}>
                <Link to={`/note/${key}`}>
                  <div className="note-preview">{details.text}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;

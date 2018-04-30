import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import base from './base';
import './App.css';

class App extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  };

  state = {
    notes: [],
    userNotes: [],
    notesSet: false
  };

  componentDidMount() {
    this.ref = base.syncState('/notes', {
      context: this,
      state: 'notes'
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps.user, );
    // debugger
    if (nextProps.user && !this.state.notesSet) {
      console.log('USER NOTES SYNCED');
      const userId = nextProps.user.id;
      this.ref = base.syncState(`/userNotes/${userId}`, {
        context: this,
        state: 'userNotes',
        asArray: true
      });
      this.setState({
        notesSet: true
      });
    }
    return true;
  }

  createNote = () => {
    // add note to database
    base
      .push('notes', {
        data: {
          text: ''
        }
      })
      .then(note => {
        const { userNotes } = this.state;
        const key = note.key;
        userNotes.push(key);
        this.setState({ userNotes });
      })
      .catch(err => {
        console.error(err);
        throw new Error(err);
      });
  };

  render() {
    const notes = Object.entries(this.state.notes);
    if (!this.props.user) {
      return <Redirect to="login" />;
    }

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
            const { userNotes } = this.state;
            if (userNotes.includes(key)) {
              return (
                <div className="col-md-6 note-preview-wrapper" key={key}>
                  <Link to={`/note/${key}`}>
                    <div className="note-preview">
                      <ReactMarkdown source={details.text} />
                    </div>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default App;

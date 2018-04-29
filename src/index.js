import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import base from './base';
import Note from './components/Note';
import registerServiceWorker from './registerServiceWorker';

import LoginPage from './views/LoginPage';

class Root extends Component {
  state = {
    user: null,
  };

  loginUser = user => {
    console.log(user);
    this.setState(user);
  };

  logout = () => {
    console.log('Logging user out');
    base.unauth();
    this.setState({ user: null });
  };

  render() {
    return (
      <Router>
        <div>
          {/* Path to main app page */}
          <Route
            exact
            path="/"
            render={props => (
              <App user={this.state.user} logout={this.logout} />
            )}
          />
          <Route 
            path="/note/:id"
            render={props => (
              <Note {...props} />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <LoginPage
                loginUser={this.loginUser}
                user={this.state.user}
                {...props}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

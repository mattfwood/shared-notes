import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import base from '../base';

import netlifyIdentity from 'netlify-identity-widget';

class LoginPage extends Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired
  };

  constructor() {
    super();

    // this.authenticate = this.authenticate.bind(this);
    // this.authHandler = this.authHandler.bind(this);
  }

  componentDidMount() {
    // const user = netlifyIdentity.currentUser();
    if (!this.props.user) {
      // netlifyIdentity.init();
      netlifyIdentity.open();

      netlifyIdentity.on('login', user => {
        console.log(user);
        this.props.setUser(user);
        netlifyIdentity.close();
      });
    }
  }

  // authenticate(provider) {
  //   console.log(`Trying to login with ${provider}`);
  //   base.authWithOAuthPopup(provider, this.authHandler);
  // }

  // authHandler(err, authData) {
  //   if (err) {
  //     console.error(err);
  //     return err;
  //   }
  //   // console.log(authData);
  //   this.props.loginUser(authData.user);
  // }

  render() {
    if (!this.props.user) {
      return (
        <div className="login-container">
          {/* <div
            className="btn btn-primary"
            onClick={() => netlifyIdentity.open()}
          >
            Get Started
          </div> */}
        </div>
      );
    }
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}
      />
    );
  }
}

export default LoginPage;

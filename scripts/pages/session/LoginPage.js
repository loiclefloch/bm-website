import React, { PropTypes } from 'react';

// -- actions
import SessionAction from '../../actions/SessionAction';

// -- stores
import SessionStore from '../../stores/SessionStore';

// -- constants
import Events from 'constants/Events';

// -- views
import AbstractComponent from 'abstracts/AbstractComponent;'

export default class LoginPage extends AbstractComponent {

  componentDidMount() {
    SessionStore.addListener(Events.CHANGE, this._onChange);
    SessionStore.addListener(Events.LOADING, this.hideLoading);
  }

  componentWillUnmount() {
    SessionStore.removeListener(Events.CHANGE, this._onChange);
    SessionStore.removeListener(Events.LOADING, this.hideLoading);
  }

  _onChange() {
    this.handleError(SessionStore.getErrors());
  }

  _onSubmit(e) {
    e.preventDefault();
    this.displayLoading();
    this.hideError();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    SessionAction.login(username, password);
  }

  render() {
    const username = SessionStore.getUsername();
    return (
      <div>
        {this.state.loadingView}
        {this.state.errorView}
        <div className="row">
          <div className="card card--login small-10 medium-6 large-4 columns small-centered">
            <form onSubmit={this._onSubmit} className="form col-sm-12 col-md-6 col-md-offset-3">
              <div className="card--login__field form-group">
                <label name="username">Username</label>
                <input type="text" defaultValue={username} name="username" ref="username"
                       className="form-control" />
              </div>
              <div className="card--login__field form-group">
                <label name="password">Password</label>
                <input type="password" name="password" ref="password" className="form-control" />
              </div>
              <div className="text-center">
                <button type="submit" className="card--login__submit btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

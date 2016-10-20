import React from 'react';

// -- actions
import SessionAction from 'actions/SessionAction';
import RouteAction from 'actions/RouteAction';

// -- stores
import SessionStore from 'stores/SessionStore';

// -- constants
import Events from 'constants/Events';
import RoutingEnum from 'constants/RoutingEnum';

// -- entities
import User from 'entities/User';

// -- views
import AbstractComponent from 'abstracts/AbstractComponent';

export default class LoginPage extends AbstractComponent {

  componentDidMount() {
    if (SessionStore.isLoggedIn()) {
      RouteAction.redirectTo(RoutingEnum.HOME);
    }

    SessionStore.addListener(Events.LOGIN_SUCCESS, this.onLoginSuccess);
    SessionStore.addListener(Events.LOGIN_FAILURE, this.onLoginError);
  }

  componentWillUnmount() {
    SessionStore.removeListener(Events.LOGIN_SUCCESS, this.onLoginSuccess);
    SessionStore.removeListener(Events.LOGIN_FAILURE, this.onLoginError);
  }

  onLoginSuccess = () => {

  };

  onLoginError = () => {
    this.hideLoading();
    this.handleError(SessionStore.getError());
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.showLoading();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    SessionAction.login(username, password);
  }

  render() {
    const user:User = SessionStore.getUser();

    return (
      <div>
        {this.renderLoading()}
        {this.renderErrorView()}

        <div className="row">
          <div className="card card--login small-10 medium-6 large-4 columns small-centered">
            <form onSubmit={this.onSubmit} className="form col-sm-12 col-md-6 col-md-offset-3">
              <div className="card--login__field form-group">
                <label name="username">Username</label>
                <input type="text" defaultValue={user.username} name="username" ref="username"
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

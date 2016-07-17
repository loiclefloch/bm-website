import React, { PropTypes, Component } from 'react';

export default class EditUserForm extends Component {

  handleSubmit() {
    const pwd = this.refs.profilePassword.getDOMNode().value;
    const pwdConfirmation = this.refs.profilePasswordConfirmation.getDOMNode().value;
    const username = this.refs.profileUsername.getDOMNode().value;

    if (!_.isEmpty(pwd) && pwd !== pwdConfirmation) {
      console.log('different');
      bootbox.alert("The password and it's confirmation are not the same");
    }
    else if ($('#edit_profile_form').find('.has-error').length > 0) {
      bootbox.alert("The form is incorrect");
    }
    else if (!_.isEmpty(pwd) || !_.isEmpty(username)) {

      this.props.onSubmit(username, pwd);
    }
  }

  render() {
    return (
      <form id="edit_profile_form" className="top-buffer-50" noValidate>

        <div className="form-group label-floating">
          <label className="control-label">Email address</label>
          <input
            type="email"
            defaultValue={this.props.profile.username}
            className="form-control"
            ref="profileUsername"
          />
        </div>

        <div className="form-group label-floating">
          <label className="control-label">Password</label>
          <input
            type="password"
            className="form-control"
            ref="profilePassword"
          />
        </div>

        <div className="form-group label-floating">
          <label className="control-label">Password confirmation</label>
          <input
            type="password"
            className="form-control"
            ref="profilePasswordConfirmation"
          />
        </div>

        <div className="text-center top-buffer-30">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>

      </form>
    )
  }

}

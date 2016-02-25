var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var SettingsActionCreators = require('../../actions/SettingsActionCreators.react.jsx');
var ServerStore = require('../../stores/ServerStore.react.jsx');
var Events = require('../../utils/Events.js');
var Dropzone = require('react-dropzone');

var ErrorMixin = require('../Common/Mixins/ErrorMixin.react.jsx');
var FontAwesome = require('react-fontawesome');

var LoadingMixin = require('../Common/Mixins/LoadingMixin.react.jsx');

var SettingsPage = React.createClass({

  mixins: [LoadingMixin, ErrorMixin],

  componentDidMount: function () {
    this.handleError(ServerStore.getErrors());

    ServerStore.addListener(Events.CHANGE, this._onChange);
    ServerStore.addListener(Events.LOADING, this.hideLoading);

    $.material.init();
  },

  componentWillUnmount: function () {
    ServerStore.removeListener(Events.CHANGE, this._onChange);
    ServerStore.removeListener(Events.LOADING, this.hideLoading);
  },

  handleEditUserSubmit: function (username, pwd) {
    console.log(username, pwd);
  },

  _onChange: function () {
    this.handleError(ServerStore.getErrors());
  },

  _export: function () {
    this.displayLoading();
    SettingsActionCreators.exportData();
  },

  onDrop: function (files) {
    console.log('Received files: ', files);

    this.setState({
      files: files
    });

    var file = files[0];

    var self = this;
    bootbox.confirm("Upload " + file.name + "?", function (result) {
      if (result == true) {
        self.displayLoading();
        SettingsActionCreators.importData(file);
      }
    });

  },

  render: function () {

    var profile = {
      username: SessionStore.getUsername()
    };


    return (
      <div>
        {this.state.loadingView}
        {this.state.errorView}

        <h1 className="text-center">Settings</h1>

        <div className="top-buffer-30">
          <h2>Data</h2>
          <div className="row">

            <div className="col-hidden-xs col-sm-6 text-center settings__export_row">
              <button type="button" className="btn btn-primary" onClick={this._export}>
                Export data
                <br/>
                <FontAwesome
                  name='cloud-download'
                  size='5x'
                  //spin
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
              </button>
            </div>

            <div className="col-hidden-xs col-sm-6 text-center settings__import_row">
              <Dropzone onDrop={this.onDrop} multiple={false}>
                <button type="button" className="btn btn-primary">
                  Import data
                  <br/>
                  <FontAwesome
                    name='cloud-upload'
                    size='5x'
                    //spin
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                  />
                </button>
              </Dropzone>
            </div>

          </div>

        </div>

        <div className="top-buffer-50">
          <h2>Modify profile</h2>
          <EditUserForm onSubmit={this.handleEditUserSubmit} profile={profile}/>
        </div>

      </div>
    );
  }
});

var EditUserForm = React.createClass({
  handleSubmit: function () {
    var pwd = this.refs.profilePassword.getDOMNode().value;
    var pwdConfirmation = this.refs.profilePasswordConfirmation.getDOMNode().value;
    var username = this.refs.profileUsername.getDOMNode().value;

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
  },

  render: function () {
    return (
      <form id="edit_profile_form" className="top-buffer-50" noValidate>

        <div className="form-group label-floating">
          <label className="control-label">Email address</label>
          <input type="email"
                 defaultValue={this.props.profile.username}
                 className="form-control"
                 ref="profileUsername"/>
        </div>

        <div className="form-group label-floating">
          <label className="control-label">Password</label>
          <input type="password"
                 className="form-control"
                 ref="profilePassword"/>
        </div>

        <div className="form-group label-floating">
          <label className="control-label">Password confirmation</label>
          <input type="password"
                 className="form-control"
                 ref="profilePasswordConfirmation"/>
        </div>

        <div className="text-center top-buffer-30">
          <button type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}>
            Submit
          </button>
        </div>

      </form>
    )
  }
});

module.exports = SettingsPage;


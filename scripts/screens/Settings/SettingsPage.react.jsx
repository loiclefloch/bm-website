var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var SettingsActionCreators = require('../../actions/SettingsActionCreators.react.jsx');
var ServerStore = require('../../stores/ServerStore.react.jsx');
var Events = require('../../utils/Events.js');
var Dropzone = require('react-dropzone');

var Loading = require('../Common/Loading.react.jsx');
var ErrorBlock = require('../Common/ErrorBlock.react.jsx');

var SettingsPage = React.createClass({

  getInitialState: function () {
    return {
      loading: false,
      errors: ServerStore.getErrors()
    };
  },

  componentDidMount: function () {
    ServerStore.addListener(Events.CHANGE, this._onChange);
    ServerStore.addListener(Events.LOADING, this._onLoadingEnd);

    $.material.init();
  },

  componentWillUnmount: function () {
    ServerStore.removeListener(Events.CHANGE, this._onChange);
    ServerStore.removeListener(Events.LOADING, this._onLoadingEnd);
  },

  displayLoading: function () {
    this.setState({
      loading: true
    });
  },

  handleEditUserSubmit: function (username, pwd) {
    console.log(username, pwd);
  },

  _onChange: function () {
    console.log('on change errors are: ', ServerStore.getErrors());
    this.setState({
      errors: ServerStore.getErrors()
    })
  },

  _export: function () {
    this.displayLoading();
    SettingsActionCreators.exportData();
  },

  _onLoadingEnd: function () {
    this.setState({
      loading: false
    });
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
        <Loading display={this.state.loading}/>
        <ErrorBlock errors={this.state.errors} />

        <h1 className="text-center">Settings</h1>

        <div className="top-buffer-30">
          <h2>Data</h2>
          <div className="row">

            <div className="col-hidden-xs col-sm-6 text-center settings__export_row">
              <button type="button" className="btn btn-primary" onClick={this._export}>Export data</button>
              <i className="fa fa-cloud-download"/>
            </div>

            <div className="col-hidden-xs col-sm-6 text-center settings__import_row">
              <Dropzone onDrop={this.onDrop} multiple={false}>
                <button type="button" className="btn btn-primary">Import data</button>
                <i className="fa fa-cloud-upload"/>
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


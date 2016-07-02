import React, { PropTypes } from 'react';

// -- actions
import SessionAction from '../../actions/SessionAction';
import SettingsAction from '../../actions/SettingsAction';

// -- stores
import SessionStore from '../../stores/SessionStore';
import ServerStore from '../../stores/ServerStore';

// -- constants
import Events from 'constants/Events';

// -- views
import AbstractComponent from 'abstracts/AbstractComponent;'
import FontAwesome from 'react-fontawesome';
import Dropzone from 'react-dropzone';

export default class SettingsPage extends AbstractComponent {

  componentDidMount() {
    this.handleError(ServerStore.getErrors());

    ServerStore.addListener(Events.CHANGE, this.onChange);
    ServerStore.addListener(Events.LOADING, this.hideLoading);

    $.material.init();
  }

  componentWillUnmount() {
    ServerStore.removeListener(Events.CHANGE, this.onChange);
    ServerStore.removeListener(Events.LOADING, this.hideLoading);
  }

  onEditUserSubmit(username, pwd) {
    console.log(username, pwd);
  }

  onChange() {
    this.handleError(ServerStore.getErrors());
  }

  onExport() {
    this.displayLoading();
    SettingsAction.exportData();
  }

  onDrop(files) {
    console.log('Received files: ', files);

    this.setState({
      files: files
    });

    const file = files[0];

    const self = this;
    bootbox.confirm("Upload " + file.name + "?", function(result) {
      if (result == true) {
        self.displayLoading();
        SettingsAction.importData(file);
      }
    });

  }

  render() {
    const profile = {
      username: SessionStore.getUsername()
    };

    return (
      <div>
        {this.renderLoading()}
        {this.renderErrorView()}

        <h1 className="text-center">Settings</h1>

        <div className="top-buffer-30">
          <h2>Data</h2>
          <div className="row">

            <div className="col-hidden-xs col-sm-6 text-center settings__export_row">
              <button type="button" className="btn btn-primary" onClick={this.onExport}>
                Export data
                <br />
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
                  <br />
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
          <EditUserForm
            onSubmit={this.onEditUserSubmit}
            profile={profile}
          />
        </div>

      </div>
    );
  }
}
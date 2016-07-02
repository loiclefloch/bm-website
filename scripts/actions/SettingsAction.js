import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';
import Api from '../utils/Api';

import ActionTypes from 'constants/ActionTypes';

export default class SettingsAction {

  static exportData() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.EXPORT_DATA
    });
    Api.exportData();
  }

  static importData(file) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.IMPORT_DATA
    });
    Api.importData(file);
  }

};

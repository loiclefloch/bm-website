import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';
import WebAPIUtils from '../utils/WebAPIUtils';

const ActionTypes = ApiConstants.ActionTypes;

export default class SettingsAction {

  static exportData() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.EXPORT_DATA
    });
    WebAPIUtils.exportData();
  }

  static importData(file) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.IMPORT_DATA
    });
    WebAPIUtils.importData(file);
  }

};

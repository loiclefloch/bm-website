import _ from 'lodash';

import { Dispatcher } from 'flux';

import PayloadSources from 'constants/PayloadSources';

/**
 * The dispatcher is the core of the app
 * it’s the central hub for the messages (actions)
 * Two main methods, one will handle the dispatch of server-initiated action,
 * the other one the view-initiated actions.
 */
class AppDispatcher extends Dispatcher {

  handleServerAction(action) {
    const payload = {
      source: PayloadSources.SERVER_ACTION,
      action
    };

    if (this.isDispatching()) {
      console.error('is dispatching could not dispatch', action);
    } else {
      console.log('dispatch server', action);
      this.dispatch(payload);
    }
  }

  handleViewAction(action) {
    const payload = {
      source: PayloadSources.VIEW_ACTION,
      action
    };

    if (this.isDispatching()) {
      console.error('is dispatching could not dispatch', action);
    } else {
      console.log('dispatch view', action);
      this.dispatch(payload);
    }
  }
}

export default new AppDispatcher();

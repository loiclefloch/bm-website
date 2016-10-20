import { Dispatcher } from 'flux';

import PayloadSources from 'constants/PayloadSources';

/**
 * The dispatcher is the core of the app
 * it’s the central hub for the messages (actions)
 * Two main methods, one will handle the dispatch of server-initiated action,
 * the other one the view-initiated actions.
 */
class AppDispatcher extends Dispatcher {

  /**
   * A bridge function between the actions create by an Api call and the dispatcher, marking
   * the action as a view action.
   * @param  {object} action The data coming from the API.
   */
  handleServerAction(action) {
    const payload = {
      source: PayloadSources.SERVER_ACTION,
      action
    };

    if (this.isDispatching()) {
      console.error(`[ACTION] ${action.type}`, 'is dispatching could not dispatch', action);
    } else {
      console.info(`[ACTION] ${action.type}`, action);
      this.dispatch(payload);
    }
  }

  /**
   * A bridge function between the action create by views and the dispatcher, marking the action
   * as a view action.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction(action) {
    const payload = {
      source: PayloadSources.VIEW_ACTION,
      action
    };

    if (this.isDispatching()) {
      console.error(`[${action.type}]`, 'is dispatching could not dispatch', action);
    } else {
      console.info(`[${action.type}]`, action);
      this.dispatch(payload);
    }
  }
}

export default new AppDispatcher();

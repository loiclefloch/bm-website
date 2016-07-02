import Config from 'constants/Config';

// use require not import!
// see https://docs.getsentry.com/hosted/clients/javascript/install/
const Raven = require('raven-js');

export default class Logger {

  static UserRole = {
    USER: 'user',
    ANONYMOUS: 'anonymous'
  };

  static LoggerLevel = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error'
  };

  static notImplemented(key:String, detail:Object) {
    console.error(key, detail);

    if (Raven.isSetup()) {
      const message = `[${key}] ${detail}`;
      Raven.captureMessage(message, {
        level: Logger.LoggerLevel.WARNING
      });
    }
  }

  static warning(key:String, detail:Object) {
    console.warn(key, detail);

    if (Raven.isSetup()) {
      const message = `[${key}] ${detail}`;
      Raven.captureMessage(message, {
        level: Logger.LoggerLevel.WARNING
      });
    }
  }

  static configure() {
    if (!Raven.isSetup()) {
      // Do not send errors to sentry if we are on localhost.
      if (document.location.hostname !== 'localhost') {
        Raven.config(Config.Logger.SENTRY_URL).install();
        Raven.setTagsContext({
          version: Config.VERSION
        });
      }
    }
  }

  /**
   * Log an exception to the console and send it to our tracker (raven).
   * @see https://github.com/getsentry/raven-js/blob/master/docs/integrations/react.rst
   *
   * @param ex
   * @param context
   */
  static logException(ex, context) {
    if (Raven.isSetup()) {
      // see https://docs.getsentry.com/hosted/clients/javascript/usage/#raven-js-additional-context
      Raven.captureException(ex, {
        extra: context
      });

      if (Config.Logger.DISPLAY_REPORT_DIALOG) {
        console.log('DISPLAY_REPORT_DIALOG');
        // see https://docs.getsentry.com/hosted/clients/javascript/usage/#user-feedback
        Raven.showReportDialog();
      }
    }
    /*eslint no-console:0*/
    window.console && console.error && console.error(ex);
  }

  /**
   *
   * @param see Logger.UserRole
   * @param userId
   */
  static setUserContext(userRole:String, userId:String) {
    if (Raven.isSetup()) {
      // https://docs.getsentry.com/hosted/clients/javascript/#adding-context
      Raven.setUserContext({
        userRole,
        id: userId
      });
    }
  }

  static clearUserContext() {
    if (Raven.isSetup()) {
      // https://docs.getsentry.com/hosted/clients/javascript/#adding-context
      Raven.setUserContext();
    }
  }

  static lastEventId() {
    if (Raven.isSetup()) {
      return Raven.lastEventId();
    }
    return null;
  }
}

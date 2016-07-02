import _ from 'lodash';

class SessionUtils {

  static saveObjectToSession(key, object) {
    const json = JSON.stringify(object);
    localStorage.setItem(key, json);
  }

  /**
   * @param key see Constant.Session
   * @param value the value to save on the session
   */
  static saveItemToSession(key:String, value:Object) {
//    console.log('[SESSION] SAVE ', key, ' : ', value);
    SessionUtils.saveObjectToSession(key, value);
  }

  /**
   * @param key see Constant.Session
   * @param defaultValue
   */
  static getItemFromSession(key:String, defaultValue = null):Object {
    const value = SessionUtils.getObjectFromSession(key, defaultValue);
//    console.log('[SESSION] GET ', key, ' : ', value);
    return value;
  }

  static getObjectFromSession(key, defaultValue = null):Object {
    const obj = localStorage.getItem(key);

    let value = null;

    // default value
    if (_.isUndefined(obj) || _.isNull(obj)) {
      if (!_.isUndefined(defaultValue) && !_.isNull(defaultValue)) {
        value = defaultValue;
      }
    } else {
      try {
        value = JSON.parse(obj);
      } catch (e) {
        value = obj;
      }
    }

    return value;
  }

  static getFloatItemFromSession(key: String, defaultReturn = 0):Number {
    let value = this.getObjectFromSession(key);

    // default value
    if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value)) {
      if (!_.isUndefined(defaultReturn) && !_.isNull(defaultReturn)) {
        value = defaultReturn;
      } else {
        value = 0;
      }
    }
//    console.log('[SESSION] GET ', key, ' : ', value);
    const intValue = parseFloat(value);
    if (_.isNaN(intValue)) {
      console.error('[SESSION] GET isNaN :( ', key, ' : ', value);
      return defaultReturn;
    }
    return intValue;
  }

  static getIntItemFromSession(key:String, defaultReturn = 0):Number {
    let value = localStorage.getItem(key);

    // default value
    if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value)) {
      if (!_.isUndefined(defaultReturn) && !_.isNull(defaultReturn)) {
        value = defaultReturn;
      } else {
        value = 0;
      }
    }
//    console.log('[SESSION] GET ', key, ' : ', value);
    const intValue = parseInt(value, 10);
    if (_.isNaN(intValue)) {
      console.error('[SESSION] GET isNaN :( ', key, ' : ', value);
      return defaultReturn;
    }
    return intValue;
  }

}

export default SessionUtils;

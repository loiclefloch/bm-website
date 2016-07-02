import _ from 'lodash';
import moment from 'moment';

export default class Utils {

  static generateUID():String {
    return `${moment().unix()}_${Math.floor((1 + Math.random()) * 0x10000).toString(16)}`
      .replace('.', '');
  }

}

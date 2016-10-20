import _ from 'lodash';

import ApiConstants from 'constants/ApiConstants';

export default class ApiError {

  code:Number;
  message:String;
  detail:String;

  constructor(code:Number = 0, message:String = '', detail:String = '') {
    this.code = code;
    this.message = message;
    this.detail = detail;
  }

  getCode():Number {
    return this.code;
  }

  getMessage():String {
    return this.message;
  }

  setCode(code:Number) {
    this.code = code;
  }

  setMessage(message:String) {
    this.message = message;
  }

  setDetail(detail:String) {
    this.detail = detail;
  }

  getDetail():String {
    if (_.isEmpty(this.detail) || _.isNull(this.detail)) {
      console.error('Unknown api error', this.code, this.message);
      return 'Erreur inconnue';
    }
    return this.detail;
  }

  populateError(errorsList:Object) {
    this.detail = ApiConstants.Error.LOGIN[this.code];
  }

}

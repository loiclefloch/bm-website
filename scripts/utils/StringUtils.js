import _ from 'lodash';
import Diacritics from 'utils/Diacritics';

export default class StringUtils {

  /**
   * Remove all non-alphanumeric chars.
   * @type {[type]}
   */
  static toAlphaNum(str:String):String {
    // see http://stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string-having-trouble-with-the-char
    return str.replace(/\W/g,'');
  }

  /**
   * Remove all non-numeric chars.
   * @type {[type]}
   */
  static toNum(str:String):String {
    // see http://stackoverflow.com/questions/1862130/strip-non-numeric-characters-from-string
    return str.replace(/\D/g,'');
  }

  static searchStringOn(search:String, value:String) {
    if (_.isEmpty(search)) {
      return true;
    }
    
    // to lower case, replace accents by the corresponding letter and then remove all non-alpha characters.
    const searchFormatted = Diacritics.replaceDiacritics(search.toLowerCase()).replace(/\W/g, '');
    const valueFormatted = Diacritics.replaceDiacritics(value.toLowerCase()).replace(/\W/g, '');

    return valueFormatted.indexOf(searchFormatted) >= 0;
  }

}

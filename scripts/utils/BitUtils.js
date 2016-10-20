
/**
 * http://stackoverflow.com/questions/1436438/how-do-you-set-clear-and-toggle-a-single-bit-in-javascript
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
 */
export default class BitUtils {

  static isSet(mask:Number, flag:Number):Boolean {
    return (flag & mask) !== 0;
  }

  static set(mask:Number, flag:Number):Number {
    return flag | mask;
  }

  static toggle(mask:Number, flag:Number):Number {
    return flag ^ mask;
  }

  static remove(mask:Number, flag:Number):Number {
    return flag & ~mask;
  }

}

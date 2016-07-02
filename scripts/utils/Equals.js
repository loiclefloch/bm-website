import _ from 'lodash';

/**
 * Source: http://stackoverflow.com/questions/13142968/deep-comparison-of-objects-arrays
 *
 * @param o
 * @param p
 * @returns {boolean}
 */
export default class Equals {

  static objectEquals(o:Object, p:Object):Boolean {

    return _.isEqual(o, p);

    if (_.isNull(o) || _.isNull(p) || _.isUndefined(p) || _.isUndefined(o)) {
      return false;
    }

    const keysO = Object.keys(o).sort();
    const keysP = Object.keys(p).sort();

    if (keysO.length !== keysP.length) {
      return false; // not the same nr of keys
    }
    if (keysO.join('') !== keysP.join('')) {
      return false; // different keys
    }
    for (let i = 0; i < keysO.length; ++i) {
      const key = keysO[i];
      const oValue = o[key];
      const pValue = p[key];

      if (oValue instanceof Array) {
        if (!(pValue instanceof Array)) {
          return false;
        }
        // if (compareObjects(oValue, pValue === false) return false
        // would work, too, and perhaps is a better fit, still, this is easy, too
        if (pValue.sort().join('') !== oValue.sort().join('')) {
          return false;
        }
      } else if (oValue instanceof Date) {
        if (!(pValue instanceof Date)) {
          return false;
        }
        if (('' + oValue) !== ('' + pValue)) {
          return false;
        }
      } else if (oValue instanceof Function) {
        if (!(pValue instanceof Function)) {
          return false;
        }
        // ignore functions
      } else if (oValue instanceof Object) {
        if (!(pValue instanceof Object)) {
          return false;
        }
        if (oValue === o) { // self reference?
          if (pValue !== p) {
            return false;
          }
        } else if (Equals.objectEquals(oValue, pValue) === false) {
          return false; // WARNING: does not deal with circular refs other than ^^
        }
      }
      if (oValue !== pValue) { // change !== to != for loose comparison
        return false; // not the same value
      }
    }
    return true;
  }
}

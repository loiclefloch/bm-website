import _ from 'lodash';

export default class ArrayUtils {

  static moveOnArray(array, fromIndex, toIndex) {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
    return array;
  }

  /**
   * Update an object on the given array. If the object is not found, we add it to the array.
   *
   * @param array: The array where update the object
   * @param obj: The object to update
   * @param comparator: Can be a string that represent the key to compare, or a function.
   * see http://stackoverflow.com/questions/27641731/is-there-a-function-in-lodash-to-replace-matched-item
   */
  static updateObject(array, obj, comparator) {
    const match = _.find(array, comparator);

    if (match) {
      // Find item index using indexOf+find
      const index = _.indexOf(array, match);

      // Replace item at index using native splice
      array.splice(index, 1, obj);
    } else {
      array.push(obj);
    }

    return array;
  }

}

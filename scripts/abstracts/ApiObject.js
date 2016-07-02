import _ from 'lodash';

import Equals from 'utils/Equals';

/**
 * @abstract
 */
export default class ApiObject {

  fromJson(data:JSON = null) {
    if (data !== null) {
      // Ex: PaymentsStatistics, we use our own object Timelapse,
      // we don't want the fromTime toTime to be set on the object.

      // we remove the unwanted keys from the data.
      // we keep only the keys that exists in the object.
//      const keys = _.keys(this);
//      console.log('KEYS', keys);
//      const dataWithOnlyKeys = _.pick(data, keys);
//      console.log('dataWithOnlyKeys', dataWithOnlyKeys);
//      Object.assign(this, dataWithOnlyKeys);

      // TODO: remove data keys that are not on the object. see Object.keys(this)
      _.merge(this, data);

      if (typeof this.postJsonAssignation === 'function') {
        this.postJsonAssignation(data);
      }
    }
  }

  /**
   * Override this to handle custom deserialization for the object
   *
   * @abstract
   */
  postJsonAssignation(data:JSON) {
  }

  copy():Object {
    // This code does not deep copy the object. The bug is visible on the opening hours, add
    // a new opening hour, it will consider that there is no modification on the opening hours
    // object.
    //    const copy = Object.assign({ __proto__: Object.getPrototypeOf(this)}, this);
    //    return copy;
    //
    //    see http://stackoverflow.com/questions/16024940/how-do-i-clone-a-javascript-class-instance
    //    return $.extend(true, Object.create(Object.getPrototypeOf(this)), JSON.parse(JSON.stringify(this)));
    //
    //    also tried deepcopy package
    //    return deepcopy(this);

    return _.cloneDeepWith(this);
  }

  // -- tools

  equals(other:Object):Boolean {
    return Equals.objectEquals(this, other);
  }
}

import { validateFunction } from './utils/validators';

/**
 * Postpone the execution of the decorated function until after wait milliseconds have elapsed
 * since the last time it was invoked. The function will be called with the arguments of the last
 * invocation. You can pass true as second parameter to cause debounce to trigger the function on
 * the leading instead of the trailing edge of the wait interval.
 *
 * Example:
 *
 * class Button extends React.Component {
 *
 *  @debounce(750, true)
 *  onClick(e) {
 *      // supposing that a user is clicking repeatedly the button
 *      // (< 750ms from the previous click),
 *      // this function logs only the first time
 *      // (because of the true as second parameter that indicate the leading edge)
 *      console.log('Clicked!');
 *    }
 *
 *    render() {
 *      return (
 *        <input
 *          type="button"
 *          onClick={this.onClick}
 *          {...this.props}
 *        />
 *      );
 *    }
 *  }
 *
 *
 * @param  {Number}  [wait=300]        Time to wait between two invocation of the function
 * @param  {Boolean} [immediate=false] 
 */
export default function debounce(wait = 300, immediate = false) {
  return (target, key, descriptor) => {
    const userFunc = descriptor.value;

    validateFunction(userFunc, 'debounce');

    let timeout;

    return {
      ...descriptor,
      value: function debouncer(...params) {
        const callNow = immediate && !timeout;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          timeout = null;
          if (!immediate) {
            userFunc.apply(this, [...params]);
          }
        }, wait);

        if (callNow) {
          userFunc.apply(this, [...params]);
        }
      },
    };
  };
}

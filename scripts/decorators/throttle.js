import { validateFunction } from './utils/validators';

/**
 * @throttle(wait: number = 300, options: Object = { leading: true, trailing: true })
 * 
 * Executes the decorated function as soon as you call it for the first time, and, if you call it
 * again any number of times during the wait period, as soon as that period is over. You can pass {
 * leading: false } or { trailing: false } as second parameter to disable the leading or the
 * trailing edge call.
 *
 * Example:
 *
 * class Button extends React.Component {
 *
 *  @throttle(750, { trailing: false })
 *  onClick(e) {
    // supposing that a user is clicking repeatedly the button
    // this function logs one time every 750ms
    // (because of { trailing: false } as second parameter that disables the trailing edge)
    console.log('Clicked!');
  }

  render() {
    return (
      <input
        type="button"
        onClick={this.onClick}
        {...this.props}
      />
    );
  }
}

 * @param  {Number} [wait=300]   [description]
 * @param  {Object} [options={}] [description]
 */
export default function throttle(wait = 300, options = {}) {
  return (target, key, descriptor) => {
    const userFunc = descriptor.value;

    validateFunction(userFunc, 'throttle');

    let result;
    let timeout;
    let args;
    let previous = 0;

    return {
      ...descriptor,
      value: function throttler(...params) {
        const now = Date.now();
        if (!previous && options.leading === false) {
          previous = now;
        }
        const remaining = wait - (now - previous);
        args = [...params];
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = userFunc.apply(this, args);
          if (!timeout) {
            args = null;
          }
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(() => {
            previous = options.leading === false ? 0 : Date.now();
            timeout = null;
            result = userFunc.apply(this, args);
            if (!timeout) {
              args = null;
            }
          }, remaining);
        }
        return result;
      },
    };
  };
}

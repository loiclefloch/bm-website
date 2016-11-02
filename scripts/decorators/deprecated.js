import { validateFunction } from './utils/validators';
import { functionName, isDescriptor, decorate } from './utils/utils';

/**
* Inspired by https://github.com/jayphelps/core-decorators.js/blob/master/src/deprecate.js
*/

const DEFAULT_MSG = 'This function will be removed in future versions.';

/**
 *
 * @param  {[type]} target            [description]
 * @param  {[type]} key               [description]
 * @param  {[type]} descriptor        [description]
 * @param  {[type]} [msg=DEFAULT_MSG] The message to display.
 * @param  {Object} [options={}]]     OPtions to pass, can contains: 'url'
 */
function handleDescriptor(target, key, descriptor, [msg = DEFAULT_MSG, options = {}]) {
  validateFunction(descriptor.value, 'extractFromEvent');

  const className = functionName(target);
  const methodSignature = `${className}_${target.constructor.name}#${key}`;

  if (options.url) {
    msg += `\n\n    See ${options.url} for more details.\n\n`;
  }

  return {
    ...descriptor,
    value: function deprecationWrapper() {
      console.warn(`DEPRECATION ${methodSignature}: ${msg}`);
      return descriptor.value.apply(this, arguments);
    }
  };
}

export default function deprecated(...args) {
  return decorate(handleDescriptor, args);
}

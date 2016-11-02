import { validateFunction } from './utils/validators';

/**
 * @extractFromEvent(attribute: string)

Creates a new decorator that extracts the specified attribute from an event and passes it as parameter to the decorated function.

Example

const extractTarget = extractFromEvent('target');

class TextField extends React.Component {

  state = {
    value: '',
  }

  @extractTarget // or directly @extractFromEvent('target')
  onChange(target) {
    this.setState({
      value: target.value,
    });
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.onChange}
        {...this.props}
      />
    );
  }
}

 * @param  {[type]} property [description]
 */
export default function extractFromEvent(property) {
  if (!property) {
    throw new Error('@extractFromEvent: invalid property specified in decorator');
  }

  return (target, key, descriptor) => {
    const userHandler = descriptor && descriptor.value;

    validateFunction(userHandler, 'extractFromEvent');

    return {
      ...descriptor,
      value: function processEvent(event, ...params) {
        userHandler.apply(this, [
          property.split('.').reduce((current, next) => current[next], event),
          ...params,
        ]);
      },
    };
  };
}

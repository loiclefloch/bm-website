import { validateFunction } from './utils/validators';

/**
 * Log name and parameters of the decorated function whenever it is called.
 *
 * class TextField extends React.Component {

  state = {
    value: '',
  }

  @log
  onChange(e) {
    // this evaluates console.log('Calling function "onChange" with params: ', e)
    this.setState({
      value: e.target.value,
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
 *
 * @param  {[type]} target     [description]
 * @param  {[type]} key        [description]
 * @param  {[type]} descriptor [description]
 */
export default function log(target, key, descriptor) {
  const userFunc = descriptor.value;
  validateFunction(userFunc, 'log');

  return {
    ...descriptor,
    value: function logger(...params) {
      //eslint-disable-next-line
      console.info(`Calling function "${key}" with params: `, ...params);
      return userFunc.apply(this, [ ...params ]);
    },
  };
}

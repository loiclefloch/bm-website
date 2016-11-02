import { validateClass } from './utils/validators';

/**
 * @initialState(state: Object)

Defines component's initialState.

Example

@initialState({
  foo: 'bar',
})
class TextField extends React.Component {

  render() {
    return (
      <input type="text" value={this.state.foo} {...this.props} />
    );
  }
}
 */

export default function initialState(state) {
  return (target) => {
    validateClass(target, 'initialState');

    // eslint-disable-next-line
    target.prototype.state = state;
  };
}

import { validateClass } from './utils/validators';

/**
 * @defaultProps(props: Object)
 * 
 * Defines component's defaultProps.

Example

@defaultProps({
  foo: 'bar',
})
class TextField extends React.Component {

  render() {
    const { foo, ...others } = this.props;
    return (
      <input type="text" value={foo} {...others} />
    );
  }
}
 *
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
export default function defaultProps(props) {
  return (target) => {
    validateClass(target, 'defaultProps');

    // eslint-disable-next-line
    target.defaultProps = props;
  };
}

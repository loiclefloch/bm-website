import { validateClass } from './utils/validators';

/**
 * Defines component's propTypes.
 *
 * Example

@propTypes({
  foo: React.PropTypes.string,
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
export default function propTypes(props) {
  return (target) => {
    validateClass(target, 'defaultProps');

    // eslint-disable-next-line
    target.propTypes = props;
  };
}

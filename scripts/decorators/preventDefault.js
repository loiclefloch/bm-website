import getEventPreprocessor from './utils/getEventPreprocessor';

/**
 * @preventDefault

Executes event.preventDefault() for you.

Example

class TextField extends React.Component {

  state = {
    value: '',
  }

  @preventDefault
  onChange(e) {
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
 */
export default getEventPreprocessor('preventDefault', 'preventDefault');

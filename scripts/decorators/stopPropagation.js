import getEventPreprocessor from './utils/getEventPreprocessor';

/**
 * @stopPropagation

Executes event.stopPropagation() for you.

Example

class TextField extends React.Component {

  state = {
    value: '',
  }

  @stopPropagation
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
export default getEventPreprocessor('stopPropagation', 'stopPropagation');

import React, { PropTypes, Component } from 'react';

import _ from 'lodash';

// TODO: Refactor: Replace TimerMixin
//import TimerMixin from 'react-timer-mixin';

export default class ErrorNotice extends Component {

  static propTypes = {
    errors: PropTypes.array,
    options: PropTypes.object,
    onHide: PropTypes.func.isRequired
  };

  static defaultProps = {
    errors: [],
    options: {},
    onHide: () => {}
  };

  state = {
    _displayError: !_.isNull(this.props.errors)
  };


//  [TimerMixin]

  onShow = () => {
    this.setState({
      _displayError: true
    });
  };

  onHide = () => {
    this.setState({
      _displayError: true
    });
  };

  render() {
    // handle options like timeout
    if (_.isInteger(this.props.options.timeout) && this.props.options.timeout !== 0) {
      this.setTimeout(() => {
        this.onHde();
        this.props.hide();
      }, this.props.options.timeout * 1000);
    }

    if (!this.state._displayError) {
      return (<div className="error_notice_hidden"></div>);
    }

    return (
      <div className="error_notice">
        {this.props.errors.map(function(error, index) {
          return (
            <div
              className="error_notice__error alert alert-danger"
              key={"error-"+index}
            >
              {error}
            </div>
          );
        })}
      </div>
    );
  }

}

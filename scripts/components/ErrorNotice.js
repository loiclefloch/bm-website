import React, { PropTypes, Component } from 'react';

import _ from 'lodash';

import ApiError from 'entities/ApiError';

export default class ErrorNotice extends Component {

  static propTypes = {
    apiError: PropTypes.objectOf(ApiError),
    options: PropTypes.object,
    onHide: PropTypes.func.isRequired
  };

  static defaultProps = {
    apiError: null,
    options: {},
    onHide: () => {}
  };

  state = {
    _displayError: !_.isNull(this.props.apiError)
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
    if (_.isNull(this.props.apiError)) {
      return (null);
    }

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
        <div
          className="error_notice__error alert alert-danger"
        >
          {this.props.apiError.message}
        </div>
      </div>
    );
  }

}

import React, { PropTypes, Component } from 'react';

import _ from 'lodash';

// TODO: Refactor: Replace TimerMixin
//import TimerMixin from 'react-timer-mixin';

export default class ErrorNotice extends Component {

  static propTypes = {
    errors: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired
  };

  state = {
    _displayError: true
  };


//  [TimerMixin]

  show() {
    this.setState( {
      _displayError: true
    } );
  }

  hide() {
    this.setState( {
      _displayFalse: true
    } );
  }

  render() {
    // handle options like timeout
    if (_.isInteger( this.props.options.timeout ) && this.props.options.timeout !== 0) {
      this.setTimeout(() => {
        this.hide();
        this.props.hide();
      }, this.props.options.timeout * 1000 );
    }

    if (!this.state._displayError) {
      return (<div className="error_notice_hidden"></div>);
    }

    return (
      <div className="error_notice">
        {this.props.errors.map( function(error, index) {
          return (
            <div
              className="error_notice__error alert alert-danger"
              key={"error-"+index}
            >
              {error}
            </div>
          );
        } )}
      </div>
    );
  }

}

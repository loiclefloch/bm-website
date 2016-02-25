var React = require('react');

var _ = require('lodash');

var TimerMixin = require('react-timer-mixin');

var ErrorNotice = React.createClass({

  propTypes: {
    errors: React.PropTypes.array.isRequired,
    options: React.PropTypes.object.isRequired,
    hide: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      _displayError: true
    };
  },

  mixins: [TimerMixin],

  show: function () {
    this.setState({
      _displayError: true
    });
  },

  hide: function () {
    this.setState({
      _displayFalse: true
    });
  },

  render: function () {

    // handle options like timeout
    if (!_.isNull(this.props.options.timeout)) {
      this.setTimeout(function () {
        this.hide();
        this.props.hide();
      }, this.props.options.timeout * 1000);
    }

    if (!this.state._displayError) {
      return (<div className="error_notice_hidden"></div>);
    }

    console.log(this.props.errors);

    return (
      <div className="error_notice">
        {this.props.errors.map(function(error, index){
          return (
          <div className="error_notice__error alert alert-danger" key={"error-"+index}>
            {error}
          </div>
            );
          })}
      </div>
    );
  }

});

module.exports = ErrorNotice;


var ErrorNotice = require('../../Common/ErrorNotice.react.jsx');

/**
 * Handle error.
 * Views must render "{this.state.errorView}"
 */
var ErrorMixin = {

  _errors: [],
  _options: {},

  /**
   *
   * @param errors array of error strings, or the error string. do nothing if a null object is given
   * @param options dictionary that can contains: timeout (in seconds)
   */
  handleError: function (errors, options) {

    if (_.isNull(errors)) {
      return;
    }

    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    this._errors = errors;
    this._options = options;

    this.updateErrorState();
  },

  hideError: function () {
    this._errors = [];
    this.updateErrorState();
  },

  updateErrorState: function () {

    this.setState({
      errorView: this.getErrorView()
    });

  },

  getErrorView: function () {

    if (this._errors.length > 0) {
      return (<ErrorNotice errors={this._errors}
                           hide={this.hideError}
                           options={this._options}/>);
    }

    return (<div className="error_notice__empty"></div>);
  }

};

module.exports = ErrorMixin;
var Loading = require('../../Common/Loading.react.jsx');

/**
 * Handle loading.
 * Views must render "{this.state.loadingView}"
 */
var LoadingMixin = {

  getInitialState: function() {
    return {
      isLoading: false,
      loadingView: (<div></div>)
    };
  },

  hideLoading: function () {
    this.setState({
      isLoading: false,
      loadingView: <Loading display={false}/>
    });
  },

  displayLoading: function () {
    this.setState({
      isLoading: true,
      loadingView: <Loading display={true}/>
    });
  }

};

module.exports = LoadingMixin;
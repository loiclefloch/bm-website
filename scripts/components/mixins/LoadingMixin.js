const Loading from './Loading.react.jsx');

/**
 * Handle loading.
 * Views must render "{this.state.loadingView}"
 */
const LoadingMixin = {

  getInitialState() {
    return {
      isLoading: false,
      loadingView: (<div></div>)
    };
  },

  hideLoading() {
    this.setState({
      isLoading: false,
      loadingView: <Loading display={false}/>
    });
  },

  displayLoading() {
    this.setState({
      isLoading: true,
      loadingView: <Loading display={true}/>
    });
  }

};

module.exports = LoadingMixin;
var React = require('react');

var LoadMore = React.createClass({

  propTypes: {
    paging: React.PropTypes.any.isRequired,
    loadMore: React.PropTypes.func.isRequired
  },

  onLoadMore: function () {
    this.props.loadMore();
    this.isLoading = true;
    this.forceUpdate();
  },

  render: function () {
    // -- Loading bar when load more is activated
    if (this.isLoading && this.isLoading == true) {
      this.isLoading = false;
      return (
        <div className="load_more__loading text-center">
          Loading...
        </div>
      )
    }

    // -- Load more bar
    var paging = this.props.paging;

    if (paging.page == paging.last_page || paging.last_page == 0) {
      return (<div className="load_more__end"></div>)
    }

    return (
      <div className="load_more text-center">
        Page {paging.page} / {paging.last_page}
        <p onClick={this.onLoadMore}>Load More</p>
      </div>
    );
  }
});

module.exports = LoadMore;
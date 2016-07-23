import React, { PropTypes, Component } from 'react';

export default class LoadMore extends Component {

  static propTypes = {
    paging: PropTypes.any.isRequired,
    onLoadMore: PropTypes.func.isRequired
  };

  handleLoadMore = () => {
    this.props.onLoadMore();
    this.isLoading = true;
    this.forceUpdate();
  };

  render() {
    // -- Loading bar when load more is activated
    if (this.isLoading && this.isLoading === true) {
      this.isLoading = false;
      return (
        <div className="load_more__loading text-center">
          Loading...
        </div>
      );
    }

    // -- Load more bar
    const paging = this.props.paging;

    if (paging.page === paging.last_page || paging.last_page === 0) {
      return (
        <div className="load_more__end"></div>
      );
    }

    return (
      <div className="load_more text-center">
        Page {paging.page} / {paging.last_page}
        <p className="pointer">
          <a onClick={this.handleLoadMore}>Load More</a>
        </p>
      </div>
    );
  }
}

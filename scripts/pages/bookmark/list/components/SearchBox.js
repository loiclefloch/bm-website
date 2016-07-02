import React, { PropTypes, Component } from 'react';

import BookmarkStore from 'stores/BookmarkStore';

export default class SearchBox extends Component {

  static propTypes = {
    search: PropTypes.shape({
      name: PropTypes.string
    }).isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
    onSearchInput: PropTypes.func.isRequired
  };

  onSubmit = (e) => {
    e.preventDefault();
    const value = this.refs.filterTextInput.value;
    this.props.search.name = value;
    this.props.onSearchSubmit(this.props.search);
  };

  onChange = () => {
    const value = this.refs.filterTextInput.value;
    this.props.search.name = value;
    this.props.onSearchInput(this.props.search);

    if (!_.isEmpty(value) && value.length >= 3) {
      // TODO: call handleSubmit if the user didn't type for 2 seconds.
    }
    else if (_.isEmpty(value)) {
      // reset
      BookmarkStore.clearSearch();
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form-horizontal">

        <div className="form-group label-floating">
          <label className="control-label">Search</label>
          <input
            type="text"
            placeholder=""
            defaultValue={this.props.search.name}
            ref="filterTextInput"
            onChange={this.onChange}
            className="form-control empty" />
          <span className="material-input" />

        </div>
      </form>
    );
  }

}

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class SearchBox extends Component {

  static propTypes = {
    search: PropTypes.string,
    onSearchInput: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func
  };

  static defaultProps = {
    search: '',
    onSearchSubmit: () => {}
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.search !== this.props.search;
  }

  onHandleSubmit = () => {
    const value = this.refs.filterTextInput.value;
    this.props.onSearchSubmit(value);
  };

  onHandleChange = () => {
    const value = this.refs.filterTextInput.value;
    this.props.onSearchInput(value);
  };

  onClear = () => {
    this.props.onSearchInput('');
  };

  render() {
    return (
      <form
        className="search_box form-horizontal"
        onSubmit={this.onHandleSubmit}
      >

        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              placeholder="Rechercher"
              value={this.props.search}
              ref="filterTextInput"
              onChange={this.onHandleChange}
              className="form-control"
            />

            <div
              className="input-group-addon pointer"
              onClick={this.onClear}
            >
              <i className="fa fa-close" />
            </div>
          </div>

        </div>
      </form>
    );
  }

}

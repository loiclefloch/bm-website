var React = require('react');

var BookmarkStore = require('../../../../stores/BookmarkStore.react.jsx');

var SearchBox = React.createClass({

  propTypes: {
    search: React.PropTypes.shape({
      name: React.PropTypes.string
    }).isRequired,
    onSearchSubmit: React.PropTypes.func.isRequired,
    onSearchInput: React.PropTypes.func.isRequired
  },

  handleSubmit: function () {
    var value = this.refs.filterTextInput.value;
    this.props.search.name = value;
    this.props.onSearchSubmit(this.props.search);
  },

  handleChange: function () {
    var value = this.refs.filterTextInput.value;
    this.props.search.name = value;
    this.props.onSearchInput(this.props.search);

    if (!_.isEmpty(value) && value.length >= 3) {
      // TODO: call handleSubmit if the user didn't type for 2 seconds.
    }
    else if (_.isEmpty(value)) {
      // reset
      BookmarkStore.clearSearch();
    }
  },
  render: function () {

    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal">

        <div className="form-group label-floating">
          <label className="control-label">Search</label>
          <input
            type="text"
            placeholder=""
            value={this.props.search.name}
            ref="filterTextInput"
            onChange={this.handleChange}
            className="form-control empty"/>
          <span className="material-input"/>

        </div>
      </form>
    );
  }

});

module.exports = SearchBox;
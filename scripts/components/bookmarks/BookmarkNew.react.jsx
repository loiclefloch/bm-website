var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var BookmarkActionCreators = require('../../actions/BookmarkActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var BookmarkStore = require('../../stores/BookmarkStore.react.jsx');
var ErrorNotice = require('../common/ErrorNotice.react.jsx');

var BookmarkNew = React.createClass({

  getInitialState: function () {
    return {
      errors: []
    };
  },

  componentDidMount: function () {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }
    BookmarkStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    BookmarkStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      errors: BookmarkStore.getErrors()
    });
    return true
  },

  _onSubmit: function (e) {
    e.preventDefault();
    console.log(this.refs);
    var name = this.refs.name.getDOMNode().value;
    var hour = this.refs.hour.getDOMNode().value;
    var minute = this.refs.minute.getDOMNode().value;
    var days = [
      this.refs.day1.getDOMNode().checked,
      this.refs.day2.getDOMNode().checked,
      this.refs.day3.getDOMNode().checked,
      this.refs.day4.getDOMNode().checked,
      this.refs.day5.getDOMNode().checked,
      this.refs.day6.getDOMNode().checked,
      this.refs.day7.getDOMNode().checked
    ];
    BookmarkActionCreators.createBookmark(name, hour, minute, days);
  },

  render: function () {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="page-header">
          <h1>Create bookmark</h1>
        </div>

        <div className="row">
          <form onSubmit={this._onSubmit} className="new-bookmark form row">

            <div className="col-xs-12 row">

              <div className="new-bookmark__name form-group col-xs-12 col-md-4">
                <input type="text" className="form-control" placeholder="Title" name="name" ref="name"/>
              </div>

              <div className="form-group col-xs-12 col-md-8">
                  <input type="text" className="form-control new-bookmark__hour" placeholder="Hour" name="hour" ref="hour"/>
                  <input type="text" className="form-control new-bookmark__minute" placeholder="Minute" name="minute" ref="minute"/>
              </div>

            </div>

            <div className="new-bookmark__days col-xs-8">
              <div className="input-group-addon">
                <label>
                  <input type="checkbox" name="day1" ref="day1"/> Monday
                </label>
              </div>
              <div className="input-group-addon">
                <label>
                  <input type="checkbox" name="day2" ref="day2"/> Tuesday
                </label>
              </div>
              <div className="input-group-addon">
                <label>
                  <input type="checkbox" name="day3" ref="day3"/> Wednesday
                </label>
              </div>
              <div className="input-group-addon">
                <label>
                  <input type="checkbox" name="day4" ref="day4"/> Thursday
                </label>
              </div>
              <div className="input-group-addon">
                <label>
                  <input type="checkbox" name="day5" ref="day5"/> Friday
                </label>
              </div>
              <div className="input-group-addon">
                <label>
                  <input type="checkbox" name="day6" ref="day6"/> Saturday
                </label>
              </div>
              <div className="input-group-addon">
                <label>
                  <input type="checkbox" name="day7" ref="day7"/> Sunday
                </label>
              </div>

            </div>
            <div className="new-bookmark__submit col-xs-12 col-md-6 col-md-offset-3 top-buffer-30">
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = BookmarkNew;


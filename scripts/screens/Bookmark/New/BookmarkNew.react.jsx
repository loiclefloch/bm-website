var React = require('react');

var WebAPIUtils = require('../../../utils/WebAPIUtils.js');

var SessionStore = require('../../../stores/SessionStore.react.jsx');
var BookmarkStore = require('../../../stores/BookmarkStore.react.jsx');

var BookmarkActionCreators = require('../../../actions/BookmarkActionCreators.react.jsx');
var RouteActionCreators = require('../../../actions/RouteActionCreators.react.jsx');

var Events = require('../../../utils/Events.js');

var showdown = require('showdown');

var Loading = require('../../Common/Loading.react.jsx');
var ErrorBlock = require('../../Common/ErrorBlock.react.jsx');

var BookmarkNew = React.createClass({

  getInitialState: function () {
    return {
      errors: [],
      loading: false
    };
  },

  componentDidMount: function () {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }
    BookmarkStore.addListener(Events.CHANGE, this._onChange);
    BookmarkStore.addListener(Events.LOADING, this._onLoadingEnd);
  },

  componentWillUnmount: function () {
    BookmarkStore.removeListener(Events.CHANGE, this._onChange);
    BookmarkStore.removeListener(Events.LOADING, this._onLoadingEnd);
  },

  _onChange: function () {
    this.setState({
      errors: BookmarkStore.getErrors()
    });
    return true
  },

  displayLoading: function () {
    this.setState({
      loading: true
    });
  },

  _onNotesChange: function () {
    var notes = this.refs.notes.value;
    console.log(notes);
    var converter = new showdown.Converter();
    this.state.preview_html = converter.makeHtml(notes);
    console.log(this.state.preview_html);
    this.forceUpdate();
  },

  _onLoadingEnd: function() {
    this.setState({
      loading: false
    });
  },

  _onSubmit: function (e) {
    e.preventDefault();
    this.displayLoading();
    var name = this.refs.name.value;
    var url = this.refs.url.value;
    var notes = this.refs.notes.value;
    var tags = [];
    BookmarkActionCreators.createBookmark(name, url, tags, notes);
  },

  render: function () {
    return (
      <div>
        <Loading display={this.state.loading}/>
        <ErrorBlock errors={this.state.errors} />

        <div className="page-header">
          <h1>Create bookmark</h1>
        </div>

        <div className="row">
          <form onSubmit={this._onSubmit} className="new_bookmark form row">

            <div className="col-xs-12 row">

              <div className="new_bookmark__url form-group col-sm-12 col-md-6">
                <input type="text" className="form-control" placeholder="Url" name="url" ref="url"/>
              </div>

              <div className="new_bookmark__name form-group col-sm-12 col-md-6">
                <input type="text" className="form-control" placeholder="Name" name="name" ref="name"/>
              </div>

              <div className="new_bookmark__notes form-group col-sm-12 col-md-6">
                <textarea className="form-control" onChange={this._onNotesChange}
                          placeholder="Notes" name="notes" ref="notes"/>
              </div>

              <div className="new_bookmark__preview col-sm-hidden col-md-6">
                <div dangerouslySetInnerHTML={{__html: this.state.preview_html}}></div>
              </div>
            </div>

            <div className="new_bookmark__submit col-xs-12 col-md-6 col-md-offset-3 top-buffer-30 text-center">
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = BookmarkNew;


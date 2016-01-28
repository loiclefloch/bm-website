var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');

var BookmarksPage = require('./components/bookmarks/BookmarksPage.react.jsx');
var BookmarkPage = require('./components/bookmarks/BookmarkPage.react.jsx');
var BookmarkNew = require('./components/bookmarks/BookmarkNew.react.jsx');


module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={BookmarksPage}/>
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="bookmarks" path="/bookmarks" handler={BookmarksPage}/>
    
    <Route name="bookmark" path="/bookmarks/:bookmarkId" handler={BookmarkPage}/>
    <Route name="new-bookmark" path="/bookmark/new" handler={BookmarkNew}/>
    
  </Route>
);


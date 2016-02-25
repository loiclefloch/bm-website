var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./screens/App.jsx');
var LoginPage = require('./screens/session/LoginPage.react.jsx');

var BookmarkListPage = require('./screens/Bookmark/List/BookmarkListPage.react.jsx');
var BookmarkPage = require('./screens/Bookmark/Page/BookmarkPage.react.jsx');
var BookmarkNew = require('./screens/Bookmark/New/BookmarkNew.react.jsx');

var TagListPage = require('./screens/Tag/List/TagListPage.react.jsx');
var TagPage = require('./screens/Tag/Page/TagPage.react.jsx');

var NotFoundPage = require('./screens/Other/NotFoundPage.react.jsx');
var ServerErrorPage = require('./screens/Other/ServerErrorPage.react.jsx');

var SettingsPage = require('./screens/Settings/SettingsPage.react.jsx');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={BookmarkListPage}/>

    <Route name="login" path="/login" handler={LoginPage}/>

    <Route name="bookmarks" path="/bookmarks" handler={BookmarkListPage}/>
    <Route name="bookmark" path="/bookmarks/:bookmarkId" handler={BookmarkPage}/>
    <Route name="new-bookmark" path="/bookmark/new" handler={BookmarkNew}/>

    <Route name="tag-list" path="/tags" handler={TagListPage}/>
    <Route name="tag" path="/tags/:tagId" handler={TagPage}/>

    <Route name="settings" path="/settings" handler={SettingsPage}/>

    <Route name="page-not-found" path="/404" handler={NotFoundPage}/>

  <Route name="server-error" path="/500" handler={ServerErrorPage}/>

  </Route>
);


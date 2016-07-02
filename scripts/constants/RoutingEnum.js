import Route from 'objects/Route';

// -- pages imports
import NotFoundPage from 'pages/other/NotFoundPage';

import LoginPage from 'pages/session/LoginPage';
import BookmarkListPage from 'pages/bookmark/list/BookmarkListPage';
import BookmarkPage from 'pages/bookmark/page/BookmarkPage';
import BookmarkNewPage from 'pages/bookmark/new/BookmarkNewPage';
import TagListPage from 'pages/tag/list/TagListPage';
import TagPage from 'pages/tag/page/TagPage';
import SettingsPage from 'pages/settings/SettingsPage';
import ServerErrorPage from 'pages/other/ServerErrorPage';

/**
 * Define all the app routes.
 * - name: The unique name of the route.
 * - path: The route url.
 * - handler: The react component that handle the route.
 */
class RoutingEnum {

  static LOGIN = new Route('login', '/login', LoginPage);

  static HOME = new Route('home', '/', BookmarkListPage);
  static BOOKMARKS_LIST = new Route('bookmarks', '/bookmarks', BookmarkListPage);
  
  static BOOKMARK = new Route('bookmark', '/bookmarks/:bookmarkId', BookmarkPage);
  
  static NEW_BOOKMARK = new Route('new-bookmark', '/bookmark/new', BookmarkNewPage);
  
  static TAGS_LIST = new Route('tag-list', '/tags', TagListPage);

  static TAG = new Route('tag', '/tags/:tagId', TagPage);

  static SETTINGS = new Route('settings', '/settings', SettingsPage);

  static SERVER_ERROR = new Route('server-error', '/500', ServerErrorPage);

  static NOT_FOUND = new Route('page-not-found', '/404', NotFoundPage);
}

export default RoutingEnum;

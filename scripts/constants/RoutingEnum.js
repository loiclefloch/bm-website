
// -- pages imports
import NotFoundPage from 'pages/other/NotFoundPage';

/**
 * Define all the app routes.
 * - name: The unique name of the route.
 * - path: The route url.
 * - handler: The react component that handle the route.
 */
class RoutingEnum {
  static NOT_FOUND = new Route('not_found', '*', NotFoundPage);
}


//
//<Route name="app" path="/" handler={App}>
//
//  <DefaultRoute handler={BookmarkListPage}/>
//
//  <Route name="login" path="/login" handler={LoginPage}/>
//
//  <Route name="bookmarks" path="/bookmarks" handler={BookmarkListPage}/>
//  <Route name="bookmark" path="/bookmarks/:bookmarkId" handler={BookmarkPage}/>
//  <Route name="new-bookmark" path="/bookmark/new" handler={BookmarkNew}/>
//
//  <Route name="tag-list" path="/tags" handler={TagListPage}/>
//  <Route name="tag" path="/tags/:tagId" handler={TagPage}/>
//
//  <Route name="settings" path="/settings" handler={SettingsPage}/>
//
//  <Route name="page-not-found" path="/404" handler={NotFoundPage}/>
//
//  <Route name="server-error" path="/500" handler={ServerErrorPage}/>
//
//</Route>

export default RoutingEnum;

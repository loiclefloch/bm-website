import request from 'superagent';
import _ from 'lodash';

// -- constants
import ApiConstants from 'constants/ApiConstants';
import Config from 'constants/Config';
import Constants from 'constants/Constants';
import ApiEndpoints from 'constants/ApiEndpoints';
import RoutingEnum from 'constants/RoutingEnum';

// -- actions
import RouteAction from 'actions/RouteAction';
import ServerAction from 'actions/ServerAction';
import BookmarkAction from 'actions/BookmarkAction';
import TagAction from 'actions/TagAction';

// -- stores
import SessionStore from 'stores/SessionStore';
import ServerStore from 'stores/ServerStore';

// -- entities
import Bookmark from 'entities/Bookmark';
import Tag from 'entities/Tag';
import BookmarksList from 'entities/BookmarksList';
import TagsList from 'entities/TagsList';

function _getErrors(text) {
  let errorMsgs = ['Something went wrong, please try again'];
  const json = JSON.parse(text);
  if (json) {
    if (!_.isEmpty(json['errors'])) {
      errorMsgs = json['errors'];
    } else if (!_.isEmpty(json['error'])) {
      errorMsgs = [json['error']];
    }
    else if (!_.isEmpty(json['message'])) {
      errorMsgs = [json['message']];
    }
    else {
      errorMsgs = [
        'Unknown error'
      ]
    }
  }
  return errorMsgs;
}


function _getAuthorizationHeader() {
  return 'Bearer ' + SessionStore.getAccessToken();
}

function handleResponse(error, res, success, failure) {

  if (res.statusCode >= 200 && res.statusCode < 300) {

    if (!_.isEmpty(res.text)) {
      success(JSON.parse(res.text));
    }
    else {
      success([]);
    }
  }
  else {
    if (res.statusCode == 404) {
      console.error('[API] Not found');
      RouteAction.redirect(RoutingEnum.NOT_FOUND);
    }
    else if (res.statusCode == 401) {
      BM.loading.hide();
      console.log('[API] 401');
      SessionStore.logout();
      // RouteAction.redirect(RoutingEnum.LOGIN);
    }
    else if (res.statusCode == 500) {
      console.log(res);
      console.error('[API] Error 500', res.text);
      ServerStore.setServerError(res); // send wall request
      RouteAction.redirect(RoutingEnum.SERVER_ERROR);
    }
    else {
      console.log('get api errors');
      const errors = _getErrors(res.text);
      console.error('[API]', errors);
      console.log('js error', error);

      //if (error) {
      //    const errors = _getErrors(error);
      //  failure(errors);
      //}

      failure(errors);
    }
  }
}

class Api {

  static login(username, password) {
    request.post(ApiEndpoints.LOGIN)
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(
        {
          grant_type: Config.Auth.grant_type,
          client_id: Config.Auth.client_id,
          client_secret: Config.Auth.client_secret,
          username: username,
          password: password
        })
      .end(function(error, res) {
        let errors = null;
        // do not call handleResponse due to different handling of 401.
        if (error) {
          errors = _getErrors(error);
        }
        else if (res.statusCode == 401 || res.statusCode == 400) {
          const json = JSON.parse(res.text);
          let errors = [json.error_description];
          if (!errors) {
            errors = _getErrors(res.text);
          }
          ServerAction.receiveLoginError(errors);
        } else {
          let json = JSON.parse(res.text);
          SessionStore.saveUsername(username);
          ServerAction.receiveLogin(json);
        }
      });
  }

  /*
   * ==================================================================================================
   *      BOOKMARK
   * ==================================================================================================
   */

  static loadBookmarks(page, limit) {

    if (_.isUndefined(limit)) {
      limit = Constants.Bookmark.DEFAULT_LIMIT
    }

    if (_.isUndefined(page)) {
      page = 1
    }
    request.get(ApiEndpoints.BOOKMARKS)
      .query({'page': page, 'limit': limit})
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            const bookmarksList:BookmarksList = new BookmarksList();
            bookmarksList.fromJson(json);
            BookmarkAction.receiveBookmarksList(bookmarksList);
          },
          function Failure(errors) {
            BookmarkAction.receiveBookmarksListError(errors);
          });
      });
  }

  static searchBookmarks(search, page = 1, limit = Constants.Bookmark.DEFAULT_LIMIT) {
    request.get(ApiEndpoints.SEARCH_BOOKMARKS)
      .query({'name': search.name})
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            const bookmarksList:BookmarksList = new BookmarksList();
            bookmarksList.fromJson(json);
            BookmarkAction.receiveSearchBookmarks(bookmarksList);
          },
          function Failure(errors) {
            BookmarkAction.receiveSearchBookmarksError(errors);
          });
      });
  }

  static loadBookmark(bookmarkId) {
    request.get(ApiEndpoints.BOOKMARKS + '/' + bookmarkId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            const bookmark:Bookmark = new Bookmark();
            bookmark.fromJson(json);
            BookmarkAction.receiveBookmark(bookmark);
          },
          function Failure(errors) {
            BookmarkAction.receiveBookmarkError(errors);
          });
      });
  }

  static createBookmark(name, url, tags, notes) {
    request.post(ApiEndpoints.BOOKMARKS)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .send(
        {
          name: name,
          url: url,
          tags: tags,
          notes: notes
        })
      .end(function(error, res) {
        if (res) {
          handleResponse(error, res,
            function Success(json) {
              const bookmark:Bookmark = new Bookmark();
              bookmark.fromJson(json);
              BookmarkAction.receiveCreatedBookmark(bookmark);
            },
            function Failure(errors) {
              BookmarkAction.receiveCreatedBookmarkError(errors);
            });
        }
      });
  }

  static deleteBookmark(bookmark) {
    request.delete(ApiEndpoints.BOOKMARKS + '/' + bookmark.id)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            BookmarkAction.receiveDeletedBookmark(bookmark);
          },
          function Failure(errors) {
            BookmarkAction.receiveDeletedBookmarkError(errors);
          });
      });
  }

  static postTagsToBookmark(tags, bookmark) {
    request.post(ApiEndpoints.BOOKMARKS + '/' + bookmark.id + '/tags')
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .send(
        {
          tags: tags
        })
      .end(function(error, res) {
        if (res) {
          handleResponse(error, res,
            function Success(json) {
              const bookmark:Bookmark = new Bookmark();
              bookmark.fromJson(json);
              BookmarkAction.receiveUpdateTagsBookmark(bookmark);
            },
            function Failure(errors) {
              BookmarkAction.receiveUpdateTagsBookmarkError(errors);
            });
        }
      });
  }

  static deleteTagsForBookmark(tags, bookmark) {
    request.delete(ApiEndpoints.BOOKMARKS + '/' + bookmark.id + '/tags')
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .send(
        {
          tags: tags
        })
      .end(function(error, res) {
        if (res) {
          handleResponse(error, res,
            function Success(json) {
              const bookmark:Bookmark = new Bookmark();
              bookmark.fromJson(json);
              BookmarkAction.receiveUpdateTagsBookmark(bookmark);
            },
            function Failure(errors) {
              BookmarkAction.receiveUpdateTagsBookmarkError(errors);
            });
        }
      });
  }

  /*
   * ==================================================================================================
   *      TAG
   * ==================================================================================================
   */

  static loadTags(page, limit) {

    if (_.isUndefined(limit)) {
      limit = Constants.Tag.DEFAULT_LIMIT
    }

    if (_.isUndefined(page)) {
      page = 1
    }
    request.get(ApiEndpoints.TAGS)
      .query({'page': page, 'limit': limit})
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            const tagsList:TagsList = new TagsList();
            tagsList.fromJson(json);
            TagAction.receiveTags(tagsList);
          },
          function Failure(errors) {
            TagAction.receiveTagsError(errors);
          });
      });
  }

  static searchTags(search, page = 1, limit = Constants.Tag.DEFAULT_LIMIT) {
    request.get(ApiEndpoints.SEARCH_TAGS)
      .query({'name': search.name})
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            const tagsList:TagsList = new TagsList();
            tagsList.fromJson(json);
            TagAction.receiveSearchTags(tagsList);
          },
          function Failure(errors) {
            TagAction.receiveSearchTagsError(errors);
          });
      });
  }

  static loadTag(tagId) {

    request.get(ApiEndpoints.TAGS + '/' + tagId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            console.log('[LOAD TAG]', json);
            const tag:Tag = new Tag();
            tag.fromJson(json.tag);

            const bookmarks = [];
            _.each(json.bookmarks, (bookmarkData) => {
              const bookmark:Bookmark = new Bookmark();
              bookmark.fromJson(bookmarkData);
              bookmarks.push(bookmark);
            });
            tag.bookmarks = bookmarks;

            TagAction.receiveTag(tag);
          },
          function Failure(errors) {
            TagAction.receiveTagError(errors);
          });
      });
  }

  static createTag(name, url, tags, notes) {
    request.post(ApiEndpoints.TAGS)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .send(
        {
          name: name,
          url: url,
          tags: tags,
          notes: notes
        })
      .end(function(error, res) {
        if (res) {
          handleResponse(error, res,
            function Success(json) {
              const tag:Tag = new Tag();
              tag.fromJson(json.tag);

              TagAction.receiveCreatedTag(tag);
            },
            function Failure(errors) {
              TagAction.receiveCreatedTagError(errors);
            });
        }
      });
  }

  static deleteTag(tagId) {
    request.delete(ApiEndpoints.TAGS + '/' + tagId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            const tag:Tag = new Tag();
            tag.fromJson(json.tag);

            TagAction.receiveRemovedTag(tag);
          },
          function Failure(errors) {
            TagAction.receiveRemovedTagError(errors);
          });
      });
  }

  /**
   * The request will create the json file to export.
   * It returns the url to download the file.
   */
  static exportData() {
    request.get(ApiEndpoints.DATA + '/export')
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerAction.receiveExport(json);
            // Open the url to download the file
            window.open(json.url);
          },
          function Failure(errors) {
            ServerAction.receiveExport(null, errors);
          });
      });

  }

  static importData(file) {
    request.post(ApiEndpoints.DATA + '/import/test') // TODO: remove /test when testing done.
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .attach(file.name, file)
      .end(function(error, res) {
        handleResponse(error, res,
          function Success(json) {
            console.log('Import ok !', json);
            ServerAction.receiveImport(json);
          },
          function Failure(errors) {
            console.log('ERROR on APIUtils', errors);
            ServerAction.receiveImport(null, errors);
          });
      });
  }

}

export default Api;

var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var ApiConstants = require('../constants/ApiConstants.js');
var Constants = require('../constants/Constants.js');
var request = require('superagent');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var ServerStore = require('../stores/ServerStore.react.jsx');

var _ = require('lodash');

function _getErrors(text) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(text))) {
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

var APIEndpoints = ApiConstants.APIEndpoints;

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
      RouteActionCreators.redirect('page-not-found');
    }
    else if (res.statusCode == 401) {
      BM.loading.hide();
      console.log('[API] 401');
      RouteActionCreators.redirect('login');
    }
    else if (res.statusCode == 500) {
      console.log(res);
      console.error('[API] Error 500', res.text);
      ServerStore.setServerError(res); // send wall request
      RouteActionCreators.redirect('server-error');
    }
    else {
      console.log('get api errors');
      var errors = _getErrors(res.text);
      console.error('[API]', errors);
      console.log('js error', error);

      //if (error) {
      //    var errors = _getErrors(error);
      //  failure(errors);
      //}

      failure(errors);
    }
  }
}

module.exports = {

  login: function (username, password) {
    request.post(APIEndpoints.LOGIN)
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(
        {
          grant_type: ApiConstants.Auth.grant_type,
          client_id: ApiConstants.Auth.client_id,
          client_secret: ApiConstants.Auth.client_secret,
          username: username,
          password: password
        })
      .end(function (error, res) {
        // do not call handleResponse due to different handling of 401.
        if (error) {
          errors = _getErrors(error);
        }
        else if (res.statusCode == 401 || res.statusCode == 400) {
          var json = JSON.parse(res.text);
          var errors = [json.error_description];
          if (!errors) {
            errors = _getErrors(res.text);
          }
          ServerActionCreators.receiveLogin(null, errors);
        } else {
          json = JSON.parse(res.text);
          localStorage.setItem('username', username);
          ServerActionCreators.receiveLogin(json, null);
        }
      });
  },

  /*
   * ==================================================================================================
   *      BOOKMARK
   * ==================================================================================================
   */

  loadBookmarks: function (page, limit) {

    if (_.isUndefined(limit)) {
      limit = Constants.Bookmark.DEFAULT_LIMIT
    }

    if (_.isUndefined(page)) {
      page = 1
    }
    request.get(APIEndpoints.BOOKMARKS)
      .query({'page': page, 'limit': limit})
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerActionCreators.receiveBookmarks(json);
          },
          function Failure(errors) {
            ServerActionCreators.receiveBookmarks(null, errors);
          });
      });
  },

  searchBookmarks: function (search, page, limit) {

    if (_.isUndefined(limit)) {
      limit = Constants.Bookmark.DEFAULT_LIMIT
    }

    if (_.isUndefined(page)) {
      page = 1
    }
    request.get(APIEndpoints.SEARCH_BOOKMARKS)
      .query({'name': search.name})
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerActionCreators.receiveSearchBookmarks(json);
          },
          function Failure(errors) {
            ServerActionCreators.receiveSearchBookmarks(null, errors);
          });
      });
  },

  loadBookmark: function (bookmarkId) {

    request.get(APIEndpoints.BOOKMARKS + '/' + bookmarkId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerActionCreators.receiveBookmark(json);
          },
          function Failure(errors) {
            ServerActionCreators.receiveBookmark(null, errors);
          });
      });
  },

  createBookmark: function (name, url, tags, notes) {
    request.post(APIEndpoints.BOOKMARKS)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .send(
        {
          name: name,
          url: url,
          tags: tags,
          notes: notes
        })
      .end(function (error, res) {
        if (res) {
          handleResponse(error, res,
            function Success(json) {
              ServerActionCreators.receiveCreatedBookmark(json, null);
            },
            function Failure(errors) {
              ServerActionCreators.receiveCreatedBookmark(null, errors);
            });
        }
      });
  },

  deleteBookmark: function (bookmarkId) {
    request.delete(APIEndpoints.BOOKMARKS + '/' + bookmarkId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerActionCreators.receiveRemovedBookmark(json);
          },
          function Failure(errors) {
            ServerActionCreators.receiveRemovedBookmark(null, errors);
          });
      });
  },

  /*
   * ==================================================================================================
   *      TAG
   * ==================================================================================================
   */

  loadTags: function (page, limit) {

    if (_.isUndefined(limit)) {
      limit = Constants.Tag.DEFAULT_LIMIT
    }

    if (_.isUndefined(page)) {
      page = 1
    }
    request.get(APIEndpoints.TAGS)
      .query({'page': page, 'limit': limit})
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerActionCreators.receiveTags(json);
          },
          function Failure(errors) {
            ServerActionCreators.receiveTags(null, errors);
          });
      });
  },

  searchTags: function (search, page, limit) {

    if (_.isUndefined(limit)) {
      limit = Constants.Tag.DEFAULT_LIMIT
    }

    if (_.isUndefined(page)) {
      page = 1
    }
    request.get(APIEndpoints.SEARCH_TAGS)
      .query({'name': search.name})
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerActionCreators.receiveSearchTags(json);
          },
          function Failure(errors) {
            ServerActionCreators.receiveSearchTags(null, errors);
          });
      });
  },

  loadTag: function (tagId) {

    request.get(APIEndpoints.TAGS + '/' + tagId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerActionCreators.receiveTag(json);
          },
          function Failure(errors) {
            ServerActionCreators.receiveTag(null, errors);
          });
      });
  },

  createTag: function (name, url, tags, notes) {
    request.post(APIEndpoints.TAGS)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .send(
        {
          name: name,
          url: url,
          tags: tags,
          notes: notes
        })
      .end(function (error, res) {
        if (res) {
          handleResponse(error, res,
            function Success(json) {
              ServerActionCreators.receiveCreatedTag(json, null);
            },
            function Failure(errors) {
              ServerActionCreators.receiveCreatedTag(null, errors);
            });
        }
      });
  },

  deleteTag: function (tagId) {
    request.delete(APIEndpoints.TAGS + '/' + tagId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerActionCreators.receiveRemovedTag(json);
          },
          function Failure(errors) {
            ServerActionCreators.receiveRemovedTag(null, errors);
          });
      });
  },

  /**
   * The request will create the json file to export.
   * It returns the url to download the file.
   */
  exportData: function () {

    request.get(APIEndpoints.DATA + '/export')
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerActionCreators.receiveExport(json);
            // Open the url to download the file
            window.open(json.url);
          },
          function Failure(errors) {
            ServerActionCreators.receiveExport(null, errors);
          });
      });

  },

  importData: function (file) {

    request.post(APIEndpoints.DATA + '/import/test') // TODO: remove /test when testing done.
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .attach(file.name, file)
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            console.log('Import ok !', json);
            ServerActionCreators.receiveImport(json);
          },
          function Failure(errors) {
            console.log('ERROR on APIUtils', errors);
            ServerActionCreators.receiveImport(null, errors);
          });
      });

  }

};


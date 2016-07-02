const ServerAction from '../actions/ServerAction');
const ApiConstants from 'constants/ApiConstants';
const Constants from 'constants/Constants';
const request from 'superagent');
const RouteAction from '../actions/RouteAction');
const SessionStore from '../stores/SessionStore');
const ServerStore from '../stores/ServerStore');

const _ from 'lodash');

function _getErrors(text) {
  const errorMsgs = ["Something went wrong, please try again"];
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

const APIEndpoints = ApiConstants.APIEndpoints;

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
      RouteAction.redirect('page-not-found');
    }
    else if (res.statusCode == 401) {
      BM.loading.hide();
      console.log('[API] 401');
      RouteAction.redirect('login');
    }
    else if (res.statusCode == 500) {
      console.log(res);
      console.error('[API] Error 500', res.text);
      ServerStore.setServerError(res); // send wall request
      RouteAction.redirect('server-error');
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

module.exports = {

  login(username, password) {
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
          const json = JSON.parse(res.text);
          const errors = [json.error_description];
          if (!errors) {
            errors = _getErrors(res.text);
          }
          ServerAction.receiveLogin(null, errors);
        } else {
          json = JSON.parse(res.text);
          localStorage.setItem('username', username);
          ServerAction.receiveLogin(json, null);
        }
      });
  },

  /*
   * ==================================================================================================
   *      BOOKMARK
   * ==================================================================================================
   */

  loadBookmarks(page, limit) {

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
            ServerAction.receiveBookmarks(json);
          },
          function Failure(errors) {
            ServerAction.receiveBookmarks(null, errors);
          });
      });
  },

  searchBookmarks(search, page, limit) {

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
            ServerAction.receiveSearchBookmarks(json);
          },
          function Failure(errors) {
            ServerAction.receiveSearchBookmarks(null, errors);
          });
      });
  },

  loadBookmark(bookmarkId) {

    request.get(APIEndpoints.BOOKMARKS + '/' + bookmarkId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerAction.receiveBookmark(json);
          },
          function Failure(errors) {
            ServerAction.receiveBookmark(null, errors);
          });
      });
  },

  createBookmark(name, url, tags, notes) {
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
              ServerAction.receiveCreatedBookmark(json, null);
            },
            function Failure(errors) {
              ServerAction.receiveCreatedBookmark(null, errors);
            });
        }
      });
  },

  deleteBookmark(bookmarkId) {
    request.delete(APIEndpoints.BOOKMARKS + '/' + bookmarkId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerAction.receiveRemovedBookmark(json);
          },
          function Failure(errors) {
            ServerAction.receiveRemovedBookmark(null, errors);
          });
      });
  },

  postTagsToBookmark(tags, bookmark) {
    request.post(APIEndpoints.BOOKMARKS + '/' + bookmark.id + '/tags')
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .send(
        {
          tags: tags
        })
      .end(function (error, res) {
        if (res) {
          handleResponse(error, res,
            function Success(json) {
              ServerAction.receiveUpdateTagsBookmark(json, null);
            },
            function Failure(errors) {
              ServerAction.receiveUpdateTagsBookmark(null, errors);
            });
        }
      });
  },

  deleteTagsForBookmark(tags, bookmark) {
    request.delete(APIEndpoints.BOOKMARKS + '/' + bookmark.id + '/tags')
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .send(
        {
          tags: tags
        })
      .end(function (error, res) {
        if (res) {
          handleResponse(error, res,
            function Success(json) {
              ServerAction.receiveUpdateTagsBookmark(json, null);
            },
            function Failure(errors) {
              ServerAction.receiveUpdateTagsBookmark(null, errors);
            });
        }
      });
  },

  /*
   * ==================================================================================================
   *      TAG
   * ==================================================================================================
   */

  loadTags(page, limit) {

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
            ServerAction.receiveTags(json);
          },
          function Failure(errors) {
            ServerAction.receiveTags(null, errors);
          });
      });
  },

  searchTags(search, page, limit) {

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
            ServerAction.receiveSearchTags(json);
          },
          function Failure(errors) {
            ServerAction.receiveSearchTags(null, errors);
          });
      });
  },

  loadTag(tagId) {

    request.get(APIEndpoints.TAGS + '/' + tagId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerAction.receiveTag(json);
          },
          function Failure(errors) {
            ServerAction.receiveTag(null, errors);
          });
      });
  },

  createTag(name, url, tags, notes) {
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
              ServerAction.receiveCreatedTag(json, null);
            },
            function Failure(errors) {
              ServerAction.receiveCreatedTag(null, errors);
            });
        }
      });
  },

  deleteTag(tagId) {
    request.delete(APIEndpoints.TAGS + '/' + tagId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res,
          function Success(json) {
            ServerAction.receiveRemovedTag(json);
          },
          function Failure(errors) {
            ServerAction.receiveRemovedTag(null, errors);
          });
      });
  },

  /**
   * The request will create the json file to export.
   * It returns the url to download the file.
   */
  exportData() {

    request.get(APIEndpoints.DATA + '/export')
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
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

  },

  importData(file) {

    request.post(APIEndpoints.DATA + '/import/test') // TODO: remove /test when testing done.
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .attach(file.name, file)
      .end(function (error, res) {
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

};


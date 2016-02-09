var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var ApiConstants = require('../constants/ApiConstants.js');
var Constants = require('../constants/Constants.js');
var request = require('superagent');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var _ = require('lodash');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
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
  if (error) {
    failure(error);
  }
  else if (res.statusCode >= 200 && res.statusCode < 300) {

    if (!_.isEmpty(res.text)) {
      success(JSON.parse(res.text));
    }
    else {
      success([]);
    }
  }
  else {
    if (res.statusCode == 404) {
      RouteActionCreators.redirect('page-not-found');
    }
    else if (res.statusCode == 401) {
      BM.loading.hide();
      RouteActionCreators.redirect('login');
    }
    else if (res.statusCode == 500) {
      failure("Internal server error");
    }
    else {
      var errors = _getErrors(res);
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
        if (error) {
          errors = _getErrors(error);
        }
        else if (res.statusCode == 401 || res.statusCode == 400) {
          var json = JSON.parse(res.text);
          var errors = [json.error_description];
          if (!errors) {
            errors = _getErrors(res);
          }
          ServerActionCreators.receiveLogin(null, errors);
        } else {
          json = JSON.parse(res.text);
          localStorage.setItem('username', username);
          ServerActionCreators.receiveLogin(json, null);
        }
      });
  },

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
        handleResponse(error, res, function (json) {
          ServerActionCreators.receiveBookmarks(json);
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
        handleResponse(error, res, function (json) {
          ServerActionCreators.receiveSearchBookmarks(json);
        });
      });
  },

  loadBookmark: function (bookmarkId) {

    request.get(APIEndpoints.BOOKMARKS + '/' + bookmarkId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        handleResponse(error, res, function (json) {
          ServerActionCreators.receiveBookmark(json);
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
          handleResponse(error, res, function (json) {
              ServerActionCreators.receiveCreatedBookmark(json, null);
            },
            function (errors) {
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
        handleResponse(error, res, function (json) {
          ServerActionCreators.receiveRemovedBookmark(json);
        });
      });
  }

};


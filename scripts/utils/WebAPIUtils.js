var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var ApiConstants = require('../constants/ApiConstants.js');
var Constants = require('../constants/Constants.js');
var request = require('superagent');
var _ = require('lodash');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}


function _getAuthorizationHeader() {
  return 'Bearer ' + sessionStorage.getItem('access_token')
}

var APIEndpoints = ApiConstants.APIEndpoints;

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
        if (res.statusCode == 401) {
          var errorMsgs = _getErrors(res);
          ServerActionCreators.receiveLogin(null, errorMsgs);
        } else {
          json = JSON.parse(res.text);
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
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveBookmarks(json);
        }
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
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveSearchBookmarks(json);
        }
      });
  },

  loadBookmark: function (bookmarkId) {

    request.get(APIEndpoints.BOOKMARKS + '/' + bookmarkId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveBookmark(json);
        }
      });
  },

  createBookmark: function (name, hour, minute, days) {
    request.post(APIEndpoints.BOOKMARKS)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .send(
        {
          name: name,
          hour: hour,
          minute: minute,
          days: days
        })
      .end(function (error, res) {
        if (res) {
          if (res.statusCode != 201) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedBookmark(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedBookmark(json, null);
          }
        }
      });
  },

  deleteBookmark: function (bookmarkId) {
    request.delete(APIEndpoints.BOOKMARKS + '/' + bookmarkId)
      .set('Accept', 'application/json')
      .set('Authorization', _getAuthorizationHeader())
      .end(function (error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveRemovedBookmark(json);
        }
      });
  }

};


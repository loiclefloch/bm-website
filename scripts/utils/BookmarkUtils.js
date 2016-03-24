var _ = require('lodash');

module.exports = {

  /**
   * Return an url without the http(s)://
   * @param url
   * @returns {*}
   */
  getPrettyUrl: function (url) {
    if (_.isEmpty(url)) {
      return "";
    }
    if (url.indexOf('https://') === 0)
      return url.slice('https://'.length);
    if (url.indexOf('http://') === 0)
      return url.slice('http://'.length);
    return url;
  },

  getDomainUrl: function (url) {
    if (_.isEmpty(url)) {
      return "";
    }
    var domain;

    // find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
    }
    else {
      domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
  },

  getDefaultName: function (bookmark) {
    // Get the name of the bookmark, page title if no name was set.
    var name = bookmark.name;
    if (_.isEmpty(name)) {
      if (!_.isEmpty(bookmark.title)) {
        name = bookmark.title;
      }
      else {
        console.log(bookmark);
        name = this.getPrettyUrl(bookmark.url);
      }

    }

    return name;
  }

};

var _ = require('lodash');

module.exports = {

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

}

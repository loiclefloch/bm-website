import ApiObject from 'abstracts/ApiObject';

import Tag from 'entities/Tag';

export default class Bookmark extends ApiObject {

  title:String;

  name:String;

  url:String;

  content:String;

  description:String;

  icon:String;

  reading_time:Number;

  notes:String;

  preview_picture:String;

  type:Number = Bookmark.Type.WEBSITE;

  updated_at:Number;

  created_at:Number;

  tags:Array<Tag> = [];

  static Type = {
    WEBSITE: 0, // default
    ARTICLE: 1,
    VIDEO: 2,
    MUSIC: 3,
    CODE: 4, // for example: github code page or project
    GAME: 5,
    SLIDE: 6
  };

  postJsonAssignation(data:JSON) {
    this.reading_time = parseInt(data.reading_time);

    this.tags = [];
    _.each(data.tags, (tagData) => {
      const tag:Tag = new Tag();
      tag.fromJson(tagData);
      this.tags.push(tag);
    });
  }

  /**
   * Return an url without the http(s)://
   * @param url
   * @returns {*}
   */
  getPrettyUrl() {
    const url = this.url;
    if (_.isEmpty(url)) {
      return '';
    }
    if (url.indexOf('https://') === 0)
      return url.slice('https://'.length);
    if (url.indexOf('http://') === 0)
      return url.slice('http://'.length);
    return url;
  }

  getDomainUrl() {
    const url = this.url;
    if (_.isEmpty(url)) {
      return '';
    }
    let domain = '';

    // find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf('://') > -1) {
      domain = url.split('/')[2];
    }
    else {
      domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
  }

  /**
   * Get the name of the bookmark, page title if no name was set.
   * @returns {String}
   */
  getDefaultName() {
    let name = this.name;
    if (_.isEmpty(name)) {
      if (!_.isEmpty(this.title)) {
        name = this.title;
      }
      else {
        name = this.getPrettyUrl();
      }
    }

    return name;
  }
}
import ApiObject from 'abstracts/ApiObject';

import Tag from 'entities/Tag'

export default class TagsList extends ApiObject {
  
  tags:Array<Tag> = [];

  postJsonAssignation(data:JSON) {
    this.tags = [];

    _.each(data.tags, (tagData:JSON) => {
      const tag:Tag = new Tag();
      tag.fromJson(tagData);
      this.tags.push(tag);
    });
  }
}
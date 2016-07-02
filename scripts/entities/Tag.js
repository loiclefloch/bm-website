import ApiObject from 'abstracts/ApiObject';

import Bookmark from 'entities/Bookmark';

export default class Tag extends ApiObject {

  name:String;

  color:String;

  bookmarks:Array<Bookmark> = [];
}
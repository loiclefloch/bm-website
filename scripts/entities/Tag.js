import ApiObject from 'abstracts/ApiObject';

import Bookmark from 'entities/Bookmark';

export default class Tag extends ApiObject {

  id:String;

  name:String;

  color:String;

  bookmarks:Array<Bookmark> = [];
}
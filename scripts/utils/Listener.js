export default class Listener {

  event:String;

  func:Function;

  constructor(event:String, func:Function) {
    this.event = event;
    this.func = func;
  }

}

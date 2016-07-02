import EventEmitter from 'events';

export default class BMEventEmitter extends EventEmitter {

  addListener(event:String, callback:Function) {
    this.on(event, callback);
  }

  emitEvent(event:String) {
    this.emit(event);
  }

}

import EventEmitter from 'events';
import _ from 'lodash';

import Listener from 'utils/Listener';

export default class PMTEventEmitter extends EventEmitter {

  addListener(event:String, callback:Function) {
    this.on(event, callback);
  }

  emitEvent(event:String) {
    console.info('[EVENT]', event);
    this.emit(event);
  }

  addListeners(listerners:Array<Listener>) {
    _.each(listerners, (listerner:Listener) => {
      this.addListener(listerner.event, listerner.func);
    });
  }

  removeListeners(listerners:Array<Listener>) {
    _.each(listerners, (listerner:Listener) => {
      this.removeListener(listerner.event, listerner.func);
    });
  }
}

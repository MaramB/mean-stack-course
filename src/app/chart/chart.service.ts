import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private socket = io('');

  constructor() { }

  listenOnChart(eventName: string) {
      let observable = new Observable (observer => {
        this.socket.on(eventName, (data)=>{
            observer.next(data);
        });
        
    });
    return observable;
    }

  disconnect() {
    this.socket.emit('forceDisconnect');
  }
    
}

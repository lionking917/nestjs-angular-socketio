import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private socket: SocketIOClient.Socket;
  constructor(
    // private socket: Socket
  ) {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  // EMITTER
  sendMessage(payload: any) {
    this.socket.emit('sendMessage', payload);
  }

  // HANDLER
  onNewMessage() {
    return new Observable((observer: any) => {
      this.socket.on('newMessage', (payload: any) => {
        observer.next(payload);
      });
    });
  }
}

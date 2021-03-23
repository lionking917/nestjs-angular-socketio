import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private socketService: SocketioService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.socketService.sendMessage('Connected!!!');
    this.socketService.onNewMessage().subscribe((payload: any) => {
      console.log('newMessage:= ' + JSON.stringify(payload));
      this.toastr.success('New Message Arrived!!!', payload.name);
    });
  }
}

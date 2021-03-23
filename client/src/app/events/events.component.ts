import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Event } from '../event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'startTime', 'endTime'];
  data: Event[] = [];
  isLoadingResults = true;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getEvents().subscribe(
      (res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      },
    );
  }
}

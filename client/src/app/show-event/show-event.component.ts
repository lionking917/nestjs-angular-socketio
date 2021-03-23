import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Event } from '../event';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.scss'],
})
export class ShowEventComponent implements OnInit {
  event: Event = {
    _id: '',
    name: '',
    startTime: new Date(),
    endTime: new Date(),
    broadcast: false,
    updatedAt: new Date(),
  };
  isLoadingResults = true;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getEventDetails(this.route.snapshot.params.id);
  }

  getEventDetails(id: any) {
    this.api.getEvent(id).subscribe((data: any) => {
      this.event = data;
      console.log(this.event);
      this.isLoadingResults = false;
    });
  }

  deleteEvent(id: any) {
    this.isLoadingResults = true;
    this.api.deleteEvent(id).subscribe(
      (res) => {
        this.isLoadingResults = false;
        this.router.navigate(['/events']);
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      },
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;
  _id = '';
  name = '';
  startTime = new Date();
  endTime = new Date();
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.getEvent(this.route.snapshot.params.id);
    this.eventForm = this.formBuilder.group({
      name: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
    });
  }

  ngOnInit() {
    console.log('EditEventComponent');
  }

  getEvent(id: any) {
    this.api.getEvent(id).subscribe((data: any) => {
      this._id = data._id;
      this.eventForm.setValue({
        name: data.name,
        startTime: data.startTime,
        endTime: data.endTime,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateEvent(this._id, this.eventForm.value).subscribe(
      (res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/show-event', id]);
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      },
    );
  }

  eventDetails() {
    this.router.navigate(['/show-event', this._id]);
  }
}

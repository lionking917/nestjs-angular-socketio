import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  name = '';
  startTime = new Date();
  endTime = new Date();
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.eventForm = this.formBuilder.group({
      name: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
    });
  }

  ngOnInit() {
    console.log('AddEventComponent');
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addEvent(this.eventForm.value).subscribe(
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
}

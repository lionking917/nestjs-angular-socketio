import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { ShowEventComponent } from './show-event/show-event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

const routes: Routes = [
  {
    path: 'events',
    component: EventsComponent,
    data: { title: 'List of Events' },
  },
  {
    path: 'show-event/:id',
    component: ShowEventComponent,
    data: { title: 'Show Event' },
  },
  {
    path: 'add-event',
    component: AddEventComponent,
    data: { title: 'Add Event' },
  },
  {
    path: 'edit-event/:id',
    component: EditEventComponent,
    data: { title: 'Edit Event' },
  },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Event } from './event';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const apiUrl = '/api/event';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(apiUrl).pipe(
      tap((event) => console.log('fetched events')),
      catchError(this.handleError('getEvents', [])),
    );
  }

  getEvent(id: number): Observable<Event> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Event>(url).pipe(
      tap((_) => console.log(`fetched event id=${id}`)),
      catchError(this.handleError<Event>(`getEvent id=${id}`)),
    );
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(apiUrl, event, httpOptions).pipe(
      tap((art: Event) => console.log(`added event w/ id=${art._id}`)),
      catchError(this.handleError<Event>('addEvent')),
    );
  }

  updateEvent(id: any, event: Event): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, event, httpOptions).pipe(
      tap((_) => console.log(`updated event id=${id}`)),
      catchError(this.handleError<any>('updateEvent')),
    );
  }

  deleteEvent(id: any): Observable<Event> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Event>(url, httpOptions).pipe(
      tap((_) => console.log(`deleted event id=${id}`)),
      catchError(this.handleError<Event>('deleteEvent')),
    );
  }
}

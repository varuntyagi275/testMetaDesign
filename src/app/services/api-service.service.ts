import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { catchError, map, tap } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl = environment.url
  constructor(private http: HttpClient) { }

  post(url: string, body: any): Observable<any> {
    return this.http.post(this.baseUrl + url, body).pipe(catchError(this.handleError()))
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(this.baseUrl + url, body).pipe(catchError(this.handleError()))
  }

  get(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url).pipe(catchError(this.handleError()))
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.baseUrl + url).pipe(catchError(this.handleError()))
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == 429) {
        alert('Server error !, Please try again')
        // localStorage.clear();
        // this.router.navigateByUrl("/login");
      }
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      return error;
    };
  }



  searchObservable= new Subject()
  
  

  


}

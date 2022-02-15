import { HttpClient } from '@angular/common/http';
import { Quote } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<User>{
    return this.http.get<User>(environment.baseURL+"api/characters")
  }

  getQuotes():Observable<Quote>{
    return this.http.get<Quote>(environment+"")
  }
}

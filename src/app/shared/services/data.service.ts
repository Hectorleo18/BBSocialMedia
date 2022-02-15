import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quote } from '../interfaces/quote';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(environment.baseURL+"characters")
  }

  getQuotes():Observable<Quote[]>{
    return this.http.get<Quote[]>(environment.baseURL+"quotes")
  }
}

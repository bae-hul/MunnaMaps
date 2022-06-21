import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = "/api";

  getUsers() {
    return this.http.get('https://testmunnamaps.herokuapp.com/api' + '/test');
  }

  getMain() {
    return this.http.get(this.rootURL);
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = "/api";

  getUsers() {

    //Only for dev purposes
    //return this.http.get(this.rootURL + '/test');

    //Un Quote this for Final Build
    return this.http.get('https://testmunnamaps.herokuapp.com/api' + '/test');
  }

  getMain() {
    return this.http.get(this.rootURL);
  }

}
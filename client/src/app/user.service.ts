import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';

import User from './user.model'
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() checkUser: EventEmitter<any> = new EventEmitter();
  @Output() newsletterData: EventEmitter<any> = new EventEmitter();
  userUrl = ``;
  constructor(
    private http: HttpClient
  ) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean {
    if(localStorage.getItem('token') ==  null){
      this.checkUser.emit(false)
      return false;
    }else{
      this.checkUser.emit(true)
      return true;
    }
  }

  sendNewsletterData(data){
    this.newsletterData.emit(data)
  }

  public userData;

  isAdmin():boolean {
    this.userData = JSON.parse(localStorage.getItem('user'));
    if(this.userData){
      if(this.userData.isAdmin){
        return true;
      }else{
        return false;
      }
    }else{
      return false
    }


  }

  authenticate(user: User): Observable<any>{
    //returns the observable of http post request 
    return this.http.post<any>(`${this.userUrl}`+`/auth/login`, user);
  }
  register(user: User): Observable<any>{
    //returns the observable of http post request 
    return this.http.post<any>(`${this.userUrl}`+`/auth/register`, user);
  }

  uploadLogo(logo){
    console.log(logo)
    return this.http.post<any>(`${this.userUrl}`+`/api/logo`, logo);
  }

  uploadHeader(header){
    console.log(header)
    return this.http.post<any>(`${this.userUrl}`+`/api/header`, header);
  }

  industryWatchHeader(header){
    return this.http.post<any>(`${this.userUrl}`+`/api/industryWatch`, header);
  }

  saveNewsletter(data){
    return this.http.post<any>(`${this.userUrl}`+`/api/save`, data);
  }

  viewAllNewsletter(){
    return this.http.get<any>(`${this.userUrl}`+`/api/view`);
  }

  removeDirectory(){
    return this.http.get<any>(`${this.userUrl}`+`/api/remove`);
  }
}

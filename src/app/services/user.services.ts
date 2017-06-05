import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from "angular2-social-login";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from './user';
import { CONFIG } from './config';
import { contentHeaders } from './headers';

@Injectable()
export class UserService {
  constructor(public http: Http, public _auth: AuthService) {

  }

  handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
  //////////    account register   //////////
  signup(user: User): Promise<any> {
    let request_url = CONFIG.SERVER_URL + '/auth/signup';
    let data = {
      auth_type: 'email',
      username: user.username,
      password: user.password,
      email: user.email,
      location: user.location,
      exam_date: user.exam_date
    };
    return this.http.post(request_url, data, { headers: contentHeaders })
      .toPromise()
      .then(res => { return res.json(); })
      .catch(this.handleError);
  }

  /////////////    facebook Login   ////////////
  facebook(users: User): Promise<any> {
    return this._auth.login('facebook').toPromise().then((data: any) => {
      data.location = users.location;
      data.exam_date = users.exam_date;
      let user = {
        auth_type: 'facebook',
        image: data.image,
        uid: data.uid,
        username: data.name,
        email: data.email,
        location: data.location,
        exam_date: data.exam_date
      };
      let url = CONFIG.SERVER_URL + '/auth/facebook';
      return this.http.post(url, { user: user })
        .toPromise()
        .then(res => { return res.json(); })
        .catch(this.handleError);
    })
  }

  /////////////    google Login   ////////////
  google(users: User): Promise<any> {
    return this._auth.login('google').toPromise().then((data: any) => {
      data.location = users.location;
      data.exam_date = users.exam_date;
      let user = {
        auth_type: 'google',
        image: data.image,
        uid: data.uid,
        username: data.name,
        email: data.email,
        location: data.location,
        exam_date: data.exam_date
      };
      let url = CONFIG.SERVER_URL + '/auth/google';
      return this.http.post(url, { user: user })
        .toPromise()
        .then(res => { return res.json(); })
        .catch(this.handleError);
    })
  }
  /////////////    account Login   ////////////

  Login(user: User): Promise<any> {
    let request_url = CONFIG.SERVER_URL + '/auth/login/';
    let data = {
      email: user.email,
      password: user.password,
    };
    return this.http.post(request_url, data, { headers: contentHeaders })
      .toPromise()
      .then(res => { return res.json(); })
      .catch(this.handleError);
  }
}

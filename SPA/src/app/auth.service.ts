import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';

  setToken(token) {
    this.token = token;
  }

  getToken(){
    return this.token;
  }

  removeToken() {
    this.token = '';
  }

  constructor() {
  }

}


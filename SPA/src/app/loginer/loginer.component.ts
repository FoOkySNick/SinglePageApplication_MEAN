import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {IForm} from '../IForm';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-loginer',
  templateUrl: './loginer.component.html',
  styleUrls: [
    './loginer.component.css',
    '../main/main.component.css'
  ]
})
export class LoginerComponent extends IForm implements OnInit {
  private isPassed = false;
  protected isShadowed = false;
  private isNotPassed = false;
  private isError = false;
  private isAdminPassed = false;

  constructor(private readonly http: HttpClient, private router: Router, private auth: AuthService) {
    super();
  }

  ngOnInit() {
  }

  switchIsPassed() {
    this.isPassed = true;
    this.isNotPassed = false;
    this.isError = false;
    this.isAdminPassed = false;
    setTimeout(() => this.isPassed = false, 3000)
  }

  switchIsNotPassed() {
    this.isNotPassed = true;
    this.isPassed = false;
    this.isError = false;
    this.isAdminPassed = false;
  }

  switchIsError() {
    this.isPassed = false;
    this.isNotPassed = false;
    this.isError = true;
    this.isAdminPassed = false;
  }

  handleLogin(res) {
    this.isShadowed = false;
    if (res['code'] === 200 && res['status'] === 'OK') {
      this.auth.setToken(res['csrf']);
      if (res['role'] === 'admin') {
        this.switchIsAdminPassed();
        this.router.navigate([res['role']]);
      } else {
        this.switchIsPassed();
        setTimeout(() => this.router.navigate([res['role']]), 3000);
      }
    } else if (res['code'] === 401 && res['status'] === 'NOT AUTHORISED') {
      this.switchIsNotPassed();
    } else {
      this.switchIsError();
    }
  }

  validate(obj) {
    return obj['login'] && obj['password'];
  }

  onComplete(obj) {
    this.isShadowed = true;
    return this.http.post('http://localhost:4200/login', {login: obj.login, password: obj.password})
      .subscribe(res => this.handleLogin(res));
  }

  onNotComplete() {
    this.isNotComplete = true;
  }

  private switchIsAdminPassed() {
    this.isAdminPassed = true;
    this.isPassed = false;
    this.isNotPassed = false;
    this.isError = false;
  }
}

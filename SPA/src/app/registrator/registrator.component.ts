import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { IForm } from '../IForm'

@Component({
  selector: 'app-registrator',
  templateUrl: './registrator.component.html',
  styleUrls: ['../main/main.component.css']
})
export class RegistratorComponent extends IForm implements OnInit {
  isShown = true;
  isShadowed = false;
  isSuccess = false;
  isFailure = false;
  isCreated = false;

  constructor(private readonly http: HttpClient, private router: Router) {
    super();
  }

  ngOnInit() {
  }

  onSuccess() {
    this.isShadowed = false;
    this.isShown = false;
    this.isSuccess = true;
    this.isCreated = false;
    this.isFailure = false;
    this.isNotComplete = false;
    setTimeout(() => this.router.navigate(['']), 3000);
  }

  onExist() {
    this.isShown = true;
    this.isCreated = true;
    this.isFailure = false;
    this.isSuccess = false;
    this.isNotComplete = false;
  }

  onFailure() {
    this.isShown = true;
    this.isFailure = true;
    this.isSuccess = false;
    this.isCreated = false;
    this.isNotComplete = false;
  }

  onNotComplete() {
    this.isShadowed = false;
    this.isNotComplete = true;
    this.isShown = true;
    this.isFailure = false;
    this.isSuccess = false;
    this.isCreated = false;
  }

  onComplete(obj) {
    this.isShadowed = true;
    this.http.post('http://localhost:4200/registration', obj)
      .subscribe((res) => this.handleRegistration(res));
  }

  handleRegistration(res) {
    this.isShadowed = false;
    if (res['code'] === 200 && res['status'] === 'OK') {
      this.onSuccess();
    } else if (res['code'] === 300 && res['status'] === 'exist') {
      this.onExist();
    } else {
      this.onFailure();
    }
  }

  validate(obj) {
    const {login, password, name, surname, telephone, email} = obj;

    return login && password && name && surname && telephone && email;
  }
}

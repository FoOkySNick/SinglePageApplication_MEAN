import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IForm} from '../../IForm';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-pay-by-card-form',
  templateUrl: './pay-by-card-form.component.html',
  styleUrls: [
    './pay-by-card-form.component.css',
    '../main.component.css'
  ]
})

export class PayByCardFormComponent extends IForm implements OnInit {
  isNotAuthorised = false;

  constructor(private readonly http: HttpClient, private auth: AuthService) {
    super();
  }

  ngOnInit() {
  }

  validate(obj) {
    const {
      cardNumber, validThru, cvcCode,
      moneyAmount, comment, email
    } = obj;

    let isCorrectTypes = /^[0-9]{16}$/.test(cardNumber) && /^[0-9]{4,5}$/.test(moneyAmount) &&
      /^[0-9]{3}$/.test(cvcCode) && /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(validThru);

    return cardNumber && validThru && cvcCode &&
      moneyAmount && email && comment && isCorrectTypes;
  }

  onComplete(obj) {
    if (this.auth.getToken()) {
      this.isShadowed = true;
      const {
        cardNumber, validThru, cvcCode,
        moneyAmount, comment, email
      } = obj;

      this.http.post('http://localhost:4200/pay-by-card', {
        cardNumber: cardNumber, validThru: validThru, safe:true,
        cvc: cvcCode, fin: Number(moneyAmount), time: new Date(),
        email: email, comment: comment, csrf: this.auth.getToken()
      }).subscribe((res) => {
        this.isShadowed = false;
        this.isComplete = true;
        this.isNotComplete = false;
        this.isNotAuthorised = false;
        setTimeout(() => this.isComplete = false, 3000);
        console.log(res);
      });
    } else {
      this.isNotAuthorised = true;
      this.isNotComplete = false;
      this.isComplete = false;
    }
  }

  onNotComplete() {
    this.isNotComplete = true;
    this.isComplete = false;
    this.isNotAuthorised = false;
  }
}


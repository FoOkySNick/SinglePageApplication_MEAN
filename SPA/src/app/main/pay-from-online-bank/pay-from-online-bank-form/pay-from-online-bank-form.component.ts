import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IForm} from '../../../IForm';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-pay-from-online-bank-form',
  templateUrl: './pay-from-online-bank-form.component.html',
  styleUrls: ['../../main.component.css']
})
export class PayFromOnlineBankFormComponent extends IForm implements OnInit {
  isNotAuthorised = false;

  validate(obj) {
    const {
      inn, bik, accountNumber,
      paymentReason, moneyAmount
    } = obj;

    let isCorrectTypes = /^([0-9]{10}|[0-9]{12})$/.test(inn) && /^[0-9]{9}$/.test(bik) &&
      /^[0-9]{20}$/.test(accountNumber) && /^[0-9]{4,5}$/.test(moneyAmount);

    return inn && bik && accountNumber && moneyAmount && isCorrectTypes;
  }

  onComplete(obj) {
    if (this.auth.getToken()) {
      this.isShadowed = true;
      const {
        inn, bik, accountNumber,
        paymentReason, moneyAmount
      } = obj;

      this.http.post('http://localhost:4200/pay-from-online-bank', {
        inn: inn, bik: bik, time: new Date(), safe: true,
        acc: accountNumber, reason: paymentReason,
        fin: Number(moneyAmount), csrf: this.auth.getToken()
      }).subscribe((res) => {
        this.isShadowed = false;
        this.isComplete = true;
        this.isNotComplete = false;
        this.isNotAuthorised = false;
        setTimeout(() => this.isComplete = false, 3000);
        console.log(res);
      });
    } else {
      this.isComplete = false;
      this.isNotAuthorised = true;
      this.isNotComplete = false;
    }
  }

  onNotComplete() {
    this.isComplete = false;
    this.isNotAuthorised = false;
    this.isNotComplete = true;
  }

  constructor(private readonly http: HttpClient, private auth: AuthService) {
    super();
  }

  ngOnInit() {
  }

}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IForm} from '../../../IForm';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-request-payment-form',
  templateUrl: './request-payment-form.component.html',
  styleUrls: ['../../main.component.css']
})
export class RequestPaymentFormComponent extends IForm implements OnInit {
  isNotAuthorised = false;

  validate(obj) {
    this.isNotAuthorised = false;
    this.isNotComplete = false;
    const {
      inn, bik, accountNumber,
      moneyAmount, telephone, email
    } = obj;

    let isCorrectTypes = /^([0-9]{10}|[0-9]{12})$/.test(inn) && /^[0-9]{9}$/.test(bik) &&
      /^[0-9]{20}$/.test(accountNumber) && /^[0-9]{4,5}$/.test(moneyAmount) && /^[0-9]{10}$/.test(telephone);

    return inn && bik && accountNumber && moneyAmount && telephone && email && isCorrectTypes;
  }

  onNotComplete() {
    this.isNotAuthorised = false;
    this.isNotComplete = true;
  }

  onComplete(obj) {
    if (this.auth.getToken()) {
      const {
        inn, bik, accountNumber,
        moneyAmount, telephone, email
      } = obj;

      this.isShadowed = true;
      this.http.post('http://localhost:4200/request-payment', {
        time: new Date(), inn: inn, bik: bik, acc: accountNumber,
        fin: Number(moneyAmount), tel: telephone, mail: email,
        csrf: this.auth.getToken()
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
    }
  }

  constructor(private readonly http: HttpClient, private auth: AuthService) {
    super();
  }

  ngOnInit() {
  }

}

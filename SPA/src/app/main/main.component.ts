import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
    './main.component.css',
    './main__controls.css'
  ]
})

export class MainComponent implements OnInit {
  isPayActive = true;
  isPayByCardActive = true;
  isPayFromOnlineBankActive = false;
  isRequestPaymentActive = false;

  payClicked() {
    this.isPayActive = true;
    this.isPayByCardActive = true;
    this.isRequestPaymentActive = false;
    this.isPayFromOnlineBankActive = false;
  }

  requestPaymentClicked() {
    this.isRequestPaymentActive = true;
    this.isPayFromOnlineBankActive = false;
    this.isPayByCardActive = false;
    this.isPayActive = false;
  }

  payByCardClicked() {
    this.isPayByCardActive = true;
    this.isRequestPaymentActive = false;
    this.isPayFromOnlineBankActive = false;
  }

  payFromOnlineBankClicked() {
    this.isPayByCardActive = false;
    this.isRequestPaymentActive = false;
    this.isPayFromOnlineBankActive = true;
  }

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: [
    './admin-panel.component.css',
    '../main/main__controls.css',
    '../main/main.component.css'
  ]
})
export class AdminPanelComponent implements OnInit {
  cardsPaymentContentShow = true;
  requestPaymentContentShow = false;

  isWait = false;

  clients = [];
  noClient = false;

  paymentData = [];
  paymentDataBottom = 0;
  paymentDataDelta = 10;

  requestPaymentData = [];
  requestPaymentDataBottom = 0;
  requestPaymentDataDelta = 10;

  isDateSorterClicked = false;
  isAmountSorterClicked = false;
  isValidThruSorterClicked = false;

  constructor(private readonly http: HttpClient, private auth: AuthService) {
    this.cardsPaymentContentClicked();
  }

  ngOnInit() {
  }

  getFromDB(db, skip, delta){
    this.isWait = true;
    return this.http.post( `http://localhost:4200/admin-${db}`, {
      skip: skip, delta: delta, csrf: this.auth.getToken()
    });
  }

  getSortedFromDb(db, skip, delta, sorter) {
    this.isWait = true;
    return this.http.post( `http://localhost:4200/admin-sorter`, {
      db: db, sorter: sorter, skip: skip, delta: delta, csrf: this.auth.getToken()
    });
  }

  getFilteredFromDB(db, skip, delta, filter) {
    this.isWait = true;
    return this.http.post('http://localhost:4200/admin-filter', {
      csrf: this.auth.getToken(), db: db, skip: skip, delta: delta, filter: filter
    });
  }

  getClientFromDB(db, skip, delta, filter){
    this.isWait = true;
    return this.http.post('http://localhost:4200/admin-get-user', {
      csrf: this.auth.getToken(), db: db, skip: skip, delta: delta, filter: filter
    });
  }

  mySort(sorter) {
    if (this.cardsPaymentContentShow) {
      this.getSortedFromDb('payment-info', 0, this.paymentDataDelta, sorter).subscribe(obj => {
        this.paymentData = obj['results'];
        this.paymentDataBottom = this.paymentDataDelta;
        this.isWait = false;
      });
    } else if (this.requestPaymentContentShow) {
      this.getSortedFromDb('request-payment-info', 0, this.requestPaymentDataDelta, sorter).subscribe(obj => {
        this.requestPaymentData = obj['results'];
        this.requestPaymentDataBottom = this.requestPaymentDataDelta;
        this.isWait = false;
      });
    }
  }

  cardsPaymentContentClicked() {
    this.cardsPaymentContentShow = true;
    this.requestPaymentContentShow = false;
    this.paymentDataBottom -= this.paymentDataDelta;
    if (this.paymentDataBottom < 0) {
      this.paymentDataBottom = 0;
    }
    this.nextPaymentInfoData();
  }

  requestPaymentContentClicked() {
    this.requestPaymentContentShow = true;
    this.cardsPaymentContentShow = false;
    this.requestPaymentDataBottom -= this.requestPaymentDataDelta;
    if (this.requestPaymentDataBottom < 0) {
      this.requestPaymentDataBottom = 0;
    }
    this.nextRequestPaymentData()
  }

  nextPaymentInfoData() {
    this.getFromDB('payment-info', this.paymentDataBottom, this.paymentDataDelta).subscribe(obj => {
      this.paymentData = obj['results'];
      this.paymentDataBottom += this.paymentDataDelta;
      this.isWait = false;
    });
  }

  morePaymentInfoData() {
    this.getFromDB('payment-info', this.paymentDataBottom, 1).subscribe(obj => {
      this.paymentData.push(obj['results']);
      this.paymentDataDelta += 1;
      this.isWait = false;
    });
  }

  moreRequestPaymentData() {
    this.getFromDB('request-payment-info',
      this.requestPaymentDataBottom, 1).subscribe(obj => {
      this.requestPaymentData.push(obj['results']);
      this.requestPaymentDataDelta += 1;
      this.isWait = false;
    });
  }

  nextRequestPaymentData() {
    this.getFromDB('request-payment-info', this.requestPaymentDataBottom,
      this.requestPaymentDataDelta).subscribe(obj => {
      this.requestPaymentData = obj['results'];
      this.requestPaymentDataBottom += this.requestPaymentDataDelta;
      this.isWait = false;
    });
  }

  dateSorter() {
    let sorter = {};
    if (!this.isDateSorterClicked) {
      sorter = {time: -1}
    } else {
      sorter = {time: 1}
    }
    this.mySort(sorter);
    this.isDateSorterClicked = !this.isDateSorterClicked;
  }

  amountSorter() {
    let sorter = {};
    if (!this.isAmountSorterClicked) {
      sorter = {fin: -1}
    } else {
      sorter = {fin: 1}
    }
    this.mySort(sorter);
    this.isAmountSorterClicked = !this.isAmountSorterClicked;
  }

  validThruSorter() {
    let sorter = {};
    if (!this.isValidThruSorterClicked) {
      sorter = {validThru: 1}
    } else {
      sorter = {validThru: -1}
    }
    this.mySort(sorter);
    this.isValidThruSorterClicked = !this.isValidThruSorterClicked;
  }

  myFilter(filter) {
    if (this.cardsPaymentContentShow) {
      this.getFilteredFromDB('payment-info', 0, this.paymentDataDelta, filter).subscribe(obj => {
        console.info(obj);
        this.paymentData = obj['results'];
        this.paymentDataBottom = this.paymentDataDelta;
        this.isWait = false;
      });
    } else if (this.requestPaymentContentShow) {
      this.getFilteredFromDB('request-payment-info', 0, this.requestPaymentDataDelta, filter).subscribe(obj => {
        this.requestPaymentData = obj['results'];
        this.requestPaymentDataBottom = this.requestPaymentDataDelta;
        this.isWait = false;
      });
    }
  }

  searchPeople(value: any) {
    this.getClientFromDB('personal-info', 0, 10, value).subscribe((obj) => {
      if (obj['code'] === 200 && obj['status'] === 'OK' && obj['results'].length !== 0) {
        this.clients.push(... obj['results']);
      } else {
        this.noClient = true;
      }
      this.isWait = false;
    });
  }

  filterFromDb(value: any) {
    const [before, after] = value.filter.split(':');
    const filter = {};
    filter[`${before}`] = after;
    this.myFilter(filter);
  }

  startPaymentInfo() {
    this.paymentDataBottom = 0;
    this.nextPaymentInfoData();
  }

  startRequestPayment() {
    this.requestPaymentDataBottom = 0;
    this.nextRequestPaymentData();
  }

  setUnsafePayment(client: any) {
    this.isWait = true;
    this.http.post('http://localhost:4200/admin-unsafe-update', {
      csrf: this.auth.getToken(), modify: client, safe: {safe: !client.safe}})
      .subscribe((obj) => {
      if (obj['code'] === 200 && obj['status'] === 'OK') {
        client.safe = !client.safe;
      }
      this.isWait = false;
    });
  }
}

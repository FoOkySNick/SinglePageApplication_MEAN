import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: [
    './person-info.component.css',
    '../../main/main.component.css',
    '../../main/main__controls.css',
    '../../footer/footer.component.css'
  ]
})
export class PersonInfoComponent implements OnInit {
  private isCompanyInfoClicked = false;
  private isShowRequisitesClicked = false;

  companyInfoClicked() {
    this.isCompanyInfoClicked = !this.isCompanyInfoClicked;
  }

  constructor() { }

  ngOnInit() {
  }

  showRequisites() {
    this.isShowRequisitesClicked = !this.isShowRequisitesClicked;
  }
}

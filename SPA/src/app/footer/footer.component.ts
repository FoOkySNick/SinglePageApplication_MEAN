import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.css',
    '../main/main.component.css'
  ]
})
export class FooterComponent implements OnInit {
  isBriefButtonActive = false;

  showMore() {
    this.isBriefButtonActive = !this.isBriefButtonActive;
  }

  constructor() { }

  ngOnInit() {
  }

}

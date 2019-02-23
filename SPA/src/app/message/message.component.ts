import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [
    './message.component.css',
    '../main/main.component.css'
  ]
})
export class MessageComponent implements OnInit, OnChanges {
  private showTitle = '';
  private showMessage = '';
  private isShown = true;

  @Input() public title: string;
  @Input() public message: string;
  @Input() public show: boolean;

  constructor() {
    this.showTitle = this.title;
    this.showMessage = this.message;
    this.isShown = this.show;
  }

  ngOnInit() {
  }

  hide() {
    this.isShown = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showTitle = this.title;
    this.showMessage = this.message;
    this.isShown = this.show;
  }
}

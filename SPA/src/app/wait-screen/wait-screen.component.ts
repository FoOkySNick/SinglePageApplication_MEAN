import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wait-screen',
  template: '<article class="shadowed"></article>',
  styles: [`
    .shadowed
    {
      background: repeating-linear-gradient(135deg, #007bff, #007bff 10px, #bc94dd 10px, #bc94dd 20px);
      position: fixed;
      display: inline-block;
      width: 100%;
      height: 100%;
      top: 0; 
      left: 0;
      right: 0; 
      bottom: 0; 
      z-index: 2;
      opacity: .2; 
      cursor: wait;
    }
  `]
})
export class WaitScreenComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

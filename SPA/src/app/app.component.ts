import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  notToDisplay = ['/admin', '/login', '/registration', '/user', '/message'];

  display() {
    return !this.notToDisplay.includes(this.router.url);
  }

  constructor(public router: Router) {
  }

  ngOnInit() {
  }
}

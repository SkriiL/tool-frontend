import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    if (!sessionStorage.getItem('id')) {
      this.route.navigate(['']);
    }
    window.onbeforeunload = this.removeId;
  }

  removeId() {
    sessionStorage.removeItem('id');
  }

  constructor(private route: Router) {}
}

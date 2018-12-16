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
    sessionStorage.setItem('isDesktop', this.isDesktop());
    window.onbeforeunload = this.removeId;
    window.onbeforeunload = this.removeIsDesktop;
  }

  removeId() {
    sessionStorage.removeItem('id');
  }

  removeIsDesktop() {
    sessionStorage.removeItem('isDesktop');
  }

  isDesktop(): string {
    if ( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return '0';
    } else {
      return '1';
    }
  }

  constructor(private route: Router) {}
}

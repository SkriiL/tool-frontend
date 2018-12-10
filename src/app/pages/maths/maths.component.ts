import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maths',
  templateUrl: './maths.component.html',
})
export class MathsComponent implements OnInit {
  public type: string;

  constructor() { }

  ngOnInit() {
  }

  polynomial() {
    this.type = 'polynomial';
  }

}

import { Component, OnInit } from '@angular/core';
import {MathsService} from '../../services/maths.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-polynomial',
  templateUrl: './polynomial.component.html',
})
export class PolynomialComponent implements OnInit {
  public level: string;
  private alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'];
  public rightAlphabet = [];
  public params = [];
  public deriv = '';

  constructor(private mathsService: MathsService) { }

  ngOnInit() {
  }

  setAlphabet() {
    this.rightAlphabet = [];
    for (let i = 0; i <= parseInt(this.level, 10); i++) {
      this.rightAlphabet.push(this.alphabet[i]);
    }
    if (this.level === '0') {
      this.rightAlphabet = [];
    }
  }

  setParams() {
    for (let i = 0; i < this.rightAlphabet.length; i++) {
      const value = (<HTMLInputElement>document.getElementById(this.rightAlphabet[i])).value;
      this.params.push(parseInt(value, 10));
    }
    this.mathsService.getDeriv('polynomial', this.params).subscribe(d => this.deriv = d);
  }

}

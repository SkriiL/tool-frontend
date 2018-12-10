import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';

@Pipe({
  name: 'mathFunction'
})
export class MathFunctionPipe implements PipeTransform {

  transform(value: number[], type: string): any {
    if (type === 'polynomial') {
      return this.polynomial(value);
    }
  }

  polynomial(params: number[]) {
    let funcStr = '';
    for (let i = 0; i < params.length; i++) {
      if (params.length - i - 1 === 0) {
        funcStr = funcStr + params[i] + ' + ';
      } else if (params.length - i - 1 === 1) {
        funcStr = funcStr + params[i] + 'x + ';
      } else if (params[i] !== 0) {
        funcStr = funcStr + params[i] + 'x' + this.upper((params.length - i - 1)) + ' + ';
      }
    }
    return funcStr.substr(0, funcStr.length - 2);
  }

  upper(number) {
    switch (number) {
      case 1: return '\u2070';
      case 2: return '\u00b2';
      case 3: return '\u00b3';
      case 4: return '\u8308';
      case 5: return '\u8309';
      case 6: return '\u8310';
      case 7: return '\u8311';
      case 8: return '\u8312';
      case 9: return '\u8313';
      case 0: return '\u8304';
    }
  };

}

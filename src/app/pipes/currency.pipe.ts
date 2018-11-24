import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: string): any {
    const valueArray = value.split('.');
    if (!valueArray[1]) {
      valueArray[1] = '00';
    }
    return valueArray[0] + ',' + valueArray[1] + '€';
  }

}

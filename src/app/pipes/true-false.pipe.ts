import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trueFalse'
})
export class TrueFalsePipe implements PipeTransform {

  transform(value: boolean): any {
    return value ? 'Ja' : 'Nein';
  }

}

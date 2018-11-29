import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date, arg?: string): any {
    if (arg === 'dateShort') {
      const year = value.getFullYear();
      const month = value.getMonth();
      const day = value.getDay();
      return year + '.' + month + '.' + day;
    } else if (arg === 'time') {
      const hour = value.getHours();
      const minute = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes();
      return hour + ':' + minute;
    }
    return Date.toString();
  }

}

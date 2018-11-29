import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date, arg?: string): any {
    if (arg === 'dateShort') {
      const year = value.getFullYear();
      const month = value.getMonth() < 10 ? '0' + (value.getMonth() + 1) : (value.getMonth() + 1);
      const day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
      return day + '.' + month + '.' + year;
    } else if (arg === 'time') {
      const hour = value.getHours();
      const minute = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes();
      return hour + ':' + minute;
    }
    return Date.toString();
  }

}

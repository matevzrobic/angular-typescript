import { HtmlParser } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zvezdice'
})
export class ZvezdicePipe implements PipeTransform {

  transform(ocena: number): string {
    let zvezdice = '';
    for (let i = 1; i <= 5; i++)
      zvezdice += '<i class="fa' + (ocena >= i ? 's' : 'r') + ' fa-star"></i>';
    return zvezdice;
  }

}

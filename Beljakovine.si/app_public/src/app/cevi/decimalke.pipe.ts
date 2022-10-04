import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalke'
})
export class DecimalkePipe implements PipeTransform {

  transform(value: number, arg: number): number {
    return +Number(value).toFixed(arg);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datumPipe'
})
export class DatumPipe implements PipeTransform {

  transform(value: string, arg: number): string {
    return value.substring(0, arg);
  }

}

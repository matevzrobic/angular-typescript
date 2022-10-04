import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(cena: number): string {
    let valuta = cena + " €";
    return valuta;
  }

}

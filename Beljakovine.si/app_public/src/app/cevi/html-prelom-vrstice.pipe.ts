import { Pipe, PipeTransform } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Pipe({
  name: 'htmlPrelomVrstice'
})
export class HtmlPrelomVrsticePipe implements PipeTransform {

  transform(text: string): string {
    return text.replace(/\n/g, '</strong><br><strong>');
  }

}

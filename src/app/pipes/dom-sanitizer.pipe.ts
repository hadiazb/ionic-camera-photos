import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer',
})
export class DomSanitizerPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(url: string): SafeStyle {
    const domImg = `background-image: url('${url}')`;

    return this.domSanitizer.bypassSecurityTrustStyle(domImg);
  }
}

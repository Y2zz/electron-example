import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'webview',
})
export class WebviewDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.height = '100%';
  }
}

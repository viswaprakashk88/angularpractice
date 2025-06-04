import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true
})
export class HoverHighlight {

  constructor() { }

  @HostBinding('style.backgroundColor') backgroundColor = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = '';
  }

}

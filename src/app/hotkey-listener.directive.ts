import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appHotkeyListener]'
})
export class HotkeyListenerDirective {
  @HostListener('document:keydown.alt.1', ['$event'])
  onKeyDown(e) {
    console.log('alt + 1');
  }
}
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumbersInput]'
})
export class onlyNumbersInput {
  private regex = new RegExp(/^\d*$/g);
  private specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) { 
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    
    const position = this.el.nativeElement.selectionStart;
    
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    
    
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
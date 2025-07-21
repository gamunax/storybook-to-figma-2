import { Directive, ElementRef, HostListener, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective implements AfterViewInit {
  @Output() clickOutside = new EventEmitter<void>();
  private shouldDetectClick = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // This timeout is needed not to detect the open click
    setTimeout(() => {
      this.shouldDetectClick = true;
    });
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    if (!this.shouldDetectClick) return; // With this line we ignore the first click

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}

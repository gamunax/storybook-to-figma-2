import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Directive({
    selector: '[menuTrigger], menuTrigger',
  })
  export class MenuTriggerDirective {
      /** Output used to target menu component method */
      @Output() triggered: EventEmitter<any> = new EventEmitter();  

      constructor(){}

      /** Fired when the trigger is clicked */
      @HostListener('click', ['$event'])
      openMenuFromDirective($event: any) {
        this.triggered.emit($event);
      }
  }
import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: 'input[haloPasswordRedaction]',
  exportAs: 'haloPasswordRedaction',
})
export class HaloPasswordRedaction {
  public isHidden: boolean;
  maskField = true;

  @HostBinding('attr.type')
  get maskValue() {
    return this.maskField ? 'password' : 'text';
  }

  public toggleMaskField() {
    this.maskField = !this.maskField;
  }
}

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'atlas-field-label',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLabelComponent {
  @HostBinding('attr.id')
  @Input() id = `atlas-label-${nextUniqueId++}`;
}

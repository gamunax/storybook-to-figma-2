import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'atlas-field-error',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorComponent {
  @HostBinding('attr.id')
  @Input() id = `atlas-error-${nextUniqueId++}`;
}

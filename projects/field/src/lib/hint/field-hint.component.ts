import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'atlas-field-hint',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldHintComponent {
  @HostBinding('attr.id')
  @Input() id = `atlas-hint-${nextUniqueId++}`;
}

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'atlas-field-prefix',
  template: `
  <span class="field-vertical-container">
    <ng-content></ng-content>
  </span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldPrefixComponent {
  @HostBinding('attr.id')
  @Input() id = `atlas-prefix-${nextUniqueId++}`;
}

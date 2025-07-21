import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'atlas-field-suffix',
  template: `
  <span class="field-vertical-container">
    <ng-content></ng-content>
  </span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldSuffixComponent {
  @HostBinding('attr.id')
  @Input() id = `atlas-suffix-${nextUniqueId++}`;
}

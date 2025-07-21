import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  Directive,
  ContentChild,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[legacy-table-header-group]'
})
export class LegacyTableHeaderGroupDirective {}

@Component({
  selector: 'legacy-table-header-group',
  template: `<ng-template #_fromView><ng-content></ng-content></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyTableHeaderGroupComponent  {

  /** @internal */
  @ViewChild('_fromView') _fromView: TemplateRef<any>;

  /** @internal */
  @ContentChild(LegacyTableHeaderGroupDirective, {read: TemplateRef}) _fromContent: TemplateRef<any>;

  get headerGroupTemplate() {
    return this._fromContent || this._fromView;
  }

  /** Number of columns the header group should span */
  @Input() colspan = 1;

  /** Set's the background for a given group */
  @Input() background: string | null = null;
}

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { CheckboxComponent } from 'atlas-checkbox';
import { IconSizes } from 'atlas-icon';
import { Subscription } from 'rxjs';
import { TableColumnAlignment } from './table.const';
import { UtilsService } from './utils.service';

/**
 * Table cell subcomponent
 */
@Component({
  selector: 'td[atlas-table-cell]',
  template: `
    <span [ngClass]="cellType">
      <ng-content ></ng-content>
    </span>
    `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'table-body-column',
    '[class.table-body-column-align-right]': 'align === alignmentOptions.right',
    '[class.table-body-column-default]': '!_isDense',
    '[class.table-body-column-dense]': '_isDense',
    '[class.table-body-column-dense-checkbox]': '_isDense && _isCheckbox',
  }
})
export class TableCellComponent implements AfterContentInit, OnDestroy {
  /** Table column alignment options */
  public alignmentOptions = TableColumnAlignment;
  /** Current alignment setting */
  @Input() align = this.alignmentOptions.left;
  /** Set the cell typography class */
  @Input() cellType: string = 'typographyStyles-body-small';
  /** 
   * @internal
   * Input element for checkbox 
   */
  @ContentChild(CheckboxComponent, { static: true }) chkb: CheckboxComponent;

  /**
   *  @internal
   *  Set special class padding for chekbox 
  */
  _isCheckbox: boolean = false;
  /**
   *  @internal
   *  Set the header to dense class state 
   */
  _isDense: boolean = false;
  /** @internal */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private utils: UtilsService) {
    this.subscriptions.add(this.utils.dense$.subscribe((value: boolean) => {
      this._isDense = value;
    }));
  }

  ngAfterContentInit(): void {
   if(this.chkb){
    this._isCheckbox = true;
    this.chkb.size = this._isDense ? IconSizes.small : IconSizes.medium;
    this.chkb.labelTypography = this._isDense ? 'typographyStyles-body-medium' : this.cellType;
   }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


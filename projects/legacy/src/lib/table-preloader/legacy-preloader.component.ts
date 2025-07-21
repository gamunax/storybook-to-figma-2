import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'legacy-table-preloader',
  templateUrl: './legacy-preloader.component.html',
  styleUrls: ['./legacy-preloader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({ opacity: 0 })),
      ])
    ]),
    trigger('list', [
      transition(':enter', [
        query('@items', stagger(30, animateChild())),
      ]),
      transition(':leave', [
        query('@items', stagger(-30, animateChild())),
      ]),
    ]),
  ]
})
export class LegacyTablePreloaderComponent implements OnChanges, OnDestroy {
  @Input() loading = false;
  @Input() rows = 10;
  @Input() columns = 10;
  /** Whether or not the preloading table head is visible */
  @Input() showTableHead = true;

  /** @internal */
  _showTable = this.loading;

  private _showTableAnimationFrame?: any;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loading && changes.loading.currentValue) {
      this._showTable = true;
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this._showTableAnimationFrame);
  }

  /** @internal */
  get _columnData() {
    return Array.from({ length: this.columns }, () => null);
  }

  /** @internal */
  get _rowData() {
    return Array.from({ length: this.rows }, () => null);
  }

  /** @internal */
  _trackBy(index) {
    return index;
  }

  /** @internal */
  _switch() {
    cancelAnimationFrame(this._showTableAnimationFrame);
    this._showTableAnimationFrame = requestAnimationFrame(() => {
      if (!this.loading) {
        this._showTable = false;
        this._cdr.markForCheck();
      }
    });
  }
}

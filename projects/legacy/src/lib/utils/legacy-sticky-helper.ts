import { Renderer2 } from '@angular/core';
import { fromEvent, merge, Observable, Observer, Subscription, animationFrameScheduler } from 'rxjs';
import { delay, map, distinctUntilChanged, share } from 'rxjs/operators';

export interface LegacyStickyHelperOptions {
  refFactory: () => Element;
  stickyFactory: () => Element;
  tbodyFactory?: () => Element;
  containerFactory?: () => Element;
  syncWidth?: boolean;
  display?: string;
}
export class LegacyStickyHelper {
  private _lastStyle: object = {};
  private _observable$: Observable<void>;
  constructor(private _renderer: Renderer2, private _options: LegacyStickyHelperOptions) {
    this._observable$ = new Observable((observable: Observer<never>) => {
      const subscription = merge(
        fromEvent(window, 'scroll'),
        fromEvent(window, 'resize'),
      ).pipe(
        delay(0, animationFrameScheduler),
        map<any, object>(() => this._positionElement()),
        map<object, object>((style) => this._appendWidth(style)),
        distinctUntilChanged(this._compareStyles),
      ).subscribe(style => this._applyStyles(style));
      return () => {
        this._applyStyles({});
        subscription.unsubscribe();
      };
    }).pipe(share());
  }
  public refreshPosition() {
    this._applyStyles(this._appendWidth(this._positionElement()));
  }
  public subscribe(): Subscription {
    return this._observable$.subscribe();
  }
  /** Apply table head widths */
  public applyTableHeadWidths(): void {
    const tableDataWidths = this._getTableDataWidths();
    const sticky = this._options.stickyFactory();
    const childSet = sticky.querySelector('.legacy-u-table__header-container').children;

    for (let i = 0; i < childSet.length; i++) {
      this._renderer.setStyle(childSet[i] as Element, 'width', `${tableDataWidths[i]}px`);
    }
  }
  private _appendWidth(style: object): object {
    if (!this._options.syncWidth) { return style; }

    const refBox = this._options.refFactory().getBoundingClientRect();
    return { ...style, width: `${refBox.width}px` };
  }
  private _positionElement(): object {
    if (this._options.containerFactory) {
      return this._positionToContainer();
    } else {
      return this._positionToRef();
    }
  }
  private _positionToRef(): object {
    const { display = 'inline-block', refFactory, stickyFactory } = this._options;
    const refBox = refFactory().getBoundingClientRect();
    const stickyBox = stickyFactory().getBoundingClientRect();
    if (refBox.top < 0 && stickyBox.height < refBox.bottom) {
      stickyFactory().classList.add('legacy-u-sticky');
      return { display, position: 'fixed', top: '0' };
    } else if (refBox.top < 0 && stickyBox.height >= refBox.bottom) {
      return { display, position: 'absolute', bottom: '0', top: 'inherit' };
    } else {
      stickyFactory().classList.remove('legacy-u-sticky');
      return { display };
    }
  }
  private _positionToContainer(): object {
    if (!this._options.containerFactory) { return {}; }

    const { display = 'inline-block', refFactory, stickyFactory, containerFactory } = this._options;
    const refBox = refFactory().getBoundingClientRect();
    const stickyBox = stickyFactory().getBoundingClientRect();
    const containerBox = containerFactory().getBoundingClientRect();
    if (stickyBox.height > containerBox.height) {
      return {};
    } else if (refBox.top < 0 && stickyBox.height < containerBox.bottom) {
      stickyFactory().classList.add('legacy-u-sticky');
      return { display, position: 'fixed', top: '0' };
    } else if (refBox.top < 0 && stickyBox.height >= containerBox.bottom) {
      return { display, position: 'absolute', bottom: '0' };
    } else {
      stickyFactory().classList.remove('legacy-u-sticky');
      return { display };
    }
  }
  private _applyStyles(currentStyle: object) {
    const sticky = this._options.stickyFactory();
    const tbody = this._options.tbodyFactory;

    Object.keys(this._lastStyle).forEach(style => {
      this._renderer.removeStyle(sticky, style);
    });
    Object.keys(currentStyle).forEach(style => {
      this._renderer.setStyle(sticky, style, currentStyle[style]);
    });
    this._lastStyle = currentStyle;

    if (tbody) {
      this.applyTableHeadWidths();
    }
  }
  private _compareStyles(a: object, b: object) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  /** Return the collection of the td widths */
  private _getTableDataWidths(): number[] {
    const { tbodyFactory } = this._options;
    const tableDataWidths = [];

    if (tbodyFactory && tbodyFactory().firstElementChild) {
      const childSet = tbodyFactory().firstElementChild.children;
      for (let i = 0; i < childSet.length; i++) {
        tableDataWidths.push(childSet[i].getBoundingClientRect().width);
      }
    }

    return tableDataWidths;
  }
}

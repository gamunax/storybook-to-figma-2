import { Directive, ElementRef, Input, Renderer2, NgZone, OnDestroy, AfterContentInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HaloWindowResizeService } from 'atlas-cdk';

@Directive({
  selector: '[atlas-equalizer]',
  exportAs: 'atlas-equalizer',
})
export class AtlasEqualizerDirective implements AfterContentInit, OnDestroy {
  @Input('atlas-equalizer') childId: string;

  private _debounceTime = 100;
  private _debouncer = new Subject<void>();
  private _observer: MutationObserver;
  private _debounceSubscription: Subscription;
  private _windowResizeSubscription: Subscription;

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _ngZone: NgZone,
    private _resizeService: HaloWindowResizeService,
  ) {}

  ngAfterContentInit() {
    this._windowResizeSubscription = this._resizeService.resizeObservable$.subscribe(() => {
      this._debouncer.next();
    });

    this._observer = new MutationObserver(() => this._debouncer.next());
    this._observer.observe(this._el.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    this._ngZone.runOutsideAngular(() => {
      this._debounceSubscription = this._debouncer.pipe(debounceTime(this._debounceTime)).subscribe(() => {
        this.recalculate();
      });
    });

    this.recalculate();
  }

  ngOnDestroy() {
    this._observer.disconnect();
    this._removeDebouncerSubscription();
    this._removeWindowResizeSubscription();
  }

  private async recalculate() {
    const imgElements = Array.from(this._el.nativeElement.querySelectorAll('img')) as HTMLImageElement[];

    await Promise.all(imgElements.map((img) => this._waitForImageLoad(img)));

    let selectors = this.childId
      ? this.childId.split(' ').map((id) => `[atlas-equalizer-child=${id}]`)
      : ['[atlas-equalizer-child]'];

    this._findChildren(selectors);
  }

  private _findChildren(selectors: string[]): void {
    const children: Record<string, NodeListOf<HTMLElement>> = {};
    selectors.forEach((selector) => {
      children[selector] = this._el.nativeElement.querySelectorAll(selector);
    });
    this._setMaxHeight(children);
  }

  private _setMaxHeight(children: Record<string, NodeListOf<HTMLElement>>): void {
    Object.values(children).forEach((childSet) => {
      let maxHeight = 0;

      childSet.forEach((child) => {
        this._renderer.setStyle(child, 'height', 'auto');
        maxHeight = Math.max(maxHeight, child.offsetHeight);
      });

      childSet.forEach((child) => {
        const heightValue = window.innerWidth > 767 ? `${maxHeight}px` : 'auto';
        this._renderer.setStyle(child, 'height', heightValue);
        this._renderer.addClass(child, 'atlas-u-equalizer');
      });
    });
  }

  private _waitForImageLoad(img: HTMLImageElement): Promise<void> {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener('load', () => resolve(), { once: true });
      } 
    });
  }

  private _removeDebouncerSubscription() {
    if (this._debounceSubscription) {
      this._debounceSubscription.unsubscribe();
    }
  }

  private _removeWindowResizeSubscription() {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
  }
}

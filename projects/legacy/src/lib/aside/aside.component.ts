import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { HaloWindowClickService } from 'atlas-cdk';

@Component({
  selector: 'legacy-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      state('*', style({ opacity: '1' })),
      state('void', style({ opacity: '0' })),
      transition(':enter', [animate('100ms ease-in-out')]),
      transition(':leave', [animate('100ms ease-in-out')]),
    ]),
    trigger('slide', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('100ms ease-in-out')]),
      transition(':leave', [animate('100ms ease-in-out', style({ transform: 'translateX(100%)' }))]),
    ]),
  ],
})
export class LegacyAsideComponent implements OnChanges, OnDestroy {
  /** Enable/Disable autoclose clicking on overlay */
  @Input()
  closeOnOverlay = true;

  /** Enable/Disable autoclose clicking outside aside */
  @Input()
  closeOutside = true;

  /** Enable/Disable autoclose with Escape key */
  @Input()
  closeOnEscape = true;

  /** Use this to enable or disable autoclose features */
  @Input()
  autoclose = true;

  /** Emit Event when this aside is going to open */
  @Output()
  asideOpen = new EventEmitter();

  /** Emit Event when this aside is going to close */
  @Output()
  asideClose = new EventEmitter();

  /** Emit Event when this aside is opened */
  @Output()
  asideOpened = new EventEmitter();

  /** Emit Event when this aside is closed */
  @Output()
  asideClosed = new EventEmitter();

  /** @internal */
  _showAside = false;

  private _clickSubscription: Subscription;
  private _keypressSubscription: Subscription;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _el: ElementRef,
    private _clickService: HaloWindowClickService,
  ) {
    if (this.autoclose) {
      this._initClickSubscription();
    }
    if (this.closeOnEscape) {
      this._initKeypressSubscription();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.autoclose) {
      if (changes.autoclose.currentValue) {
        this._initClickSubscription();
      } else {
        this._destroyClickSubscription();
      }
    }
    if (changes.closeOnEscape) {
      if (changes.closeOnEscape.currentValue) {
        this._initKeypressSubscription();
      } else {
        this._destroyKeypressSubscription();
      }
    }
  }

  ngOnDestroy() {
    this._destroyClickSubscription();
    this._destroyKeypressSubscription();
  }

  /**
   * Opens the aside if it is not already open
   */
  open() {
    if (!this._showAside) {
      this._showAside = true;
      this._changeDetectorRef.markForCheck();
      this.asideOpen.emit();
    }
  }

  /**
   * Closes the aside if it is not already closed
   */
  close() {
    if (this._showAside) {
      this._showAside = false;
      this._changeDetectorRef.markForCheck();
      this.asideClose.emit();
    }
  }

  /**
   * Toggle the open/close state of this aside
   */
  toggle() {
    this._showAside = !this._showAside;
    this._changeDetectorRef.markForCheck();
  }

  /** @internal */
  _handleOverlayClick(event: MouseEvent) {
    if (!this.closeOnOverlay || !this.autoclose) {
      return;
    }
    this.close();
  }

  _emitAnimationEnd() {
    if (this._showAside) {
      this.asideOpened.emit();
    } else {
      this.asideClosed.emit();
    }
  }

  private _initClickSubscription() {
    this._destroyClickSubscription();
    this._clickSubscription = this._clickService.clickObservable$.subscribe(this._handleWindowClick.bind(this));
  }

  private _destroyClickSubscription() {
    if (this._clickSubscription) {
      this._clickSubscription.unsubscribe();
      delete this._clickSubscription;
    }
  }

  private _initKeypressSubscription() {
    this._destroyKeypressSubscription();
    this._keypressSubscription = fromEvent(window, 'keydown').subscribe(this._handleKeypress.bind(this));
  }

  private _destroyKeypressSubscription() {
    if (this._keypressSubscription) {
      this._keypressSubscription.unsubscribe();
      delete this._keypressSubscription;
    }
  }

  private _handleWindowClick(event: MouseEvent) {
    const el: HTMLElement = this._el.nativeElement;
    const target = event.target as HTMLElement;
    if (!this.autoclose || !this.closeOutside || target === el || el.contains(target)) {
      return;
    }
    this.close();
  }

  private _handleKeypress(event: KeyboardEvent) {
    if (!this.closeOnEscape || !this.autoclose) {
      return;
    }
    // Using new key API because keyCode is deprecated
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    if (event.key && (event.key === 'Escape' || event.key === 'Esc')) {
      return this.close();
    }
  }
}

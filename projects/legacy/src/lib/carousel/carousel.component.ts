import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HaloWindowResizeService } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';

@Component({
  selector: 'legacy-carousel-slide',
  templateUrl: 'slide.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LegacyCarouselSlideComponent implements AfterViewInit {
  private _slideEl;

  @HostBinding('class.legacy-c-carousel-slide') _always = true;

  constructor(public el: ElementRef) {}

  ngAfterViewInit() {
    this._slideEl = this.el.nativeElement;
  }

  /** @internal */
  getContentHeight() {
    return this._slideEl ? this._slideEl.offsetHeight : 0;
  }
}

/*
   * Carousel
   *
   * Usage:
   <h3>Carousel</h3>
   <legacy-carousel [animationTime]="1" [slideDuration]="5" [disableAutoRotate]="false" [disableDrag]="false">
   <legacy-carousel-slide>Slide 0</legacy-carousel-slide>
   <legacy-carousel-slide>Slide 1</legacy-carousel-slide>
   <legacy-carousel-slide>Slide 2</legacy-carousel-slide>
   <legacy-carousel-slide>Slide 3</legacy-carousel-slide>
   <legacy-carousel-slide>Slide 4</legacy-carousel-slide>
   </legacy-carousel>
   *
   */

@Component({
  selector: 'legacy-carousel',
  templateUrl: 'carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LegacyCarouselComponent implements OnDestroy, AfterViewInit, AfterContentInit, OnChanges {
  /** @internal */
  @ContentChildren(LegacyCarouselSlideComponent) public slides: QueryList<LegacyCarouselSlideComponent>;

  /** @internal */
  @ViewChild('slideTrack', { static: true }) slideTrack: ElementRef;

  /** @internal */
  @ViewChild('content', { static: true }) content: ElementRef;

  @Input() public animationTime = 2;
  /**
   * Duration of slide in seconds
   *
   * @memberof LegacyCarouselComponent
   */
  @Input() public slideDuration = 5;
  @Input() public disableAutoRotate = false;
  @Input() public slidesVisible = 1;
  @Input() public disableDrag = false;
  /**
   * Fixed height relative to all slide heights.
   *
   * @memberof LegacyCarouselComponent
   */
  @Input() public enableFixedHeight = false;
  /**
   * Current active slide determines height of carousel.
   *
   * @memberof LegacyCarouselComponent
   */
  @Input() public autoSlideHeight = false;

  /**
   *
   * Allows changing of slide using stepSize or offset
   * This allows users to view all slides before looping back to first slide.
   * @deprecated
   * @memberof LegacyCarouselComponent
   */
  @Input()
  get changeWithStepOffset() {
    return true;
  }
  set changeWithStepOffset(v: boolean) {
    if (!v) {
      console.warn('WARNING: [changeWithStepOffset] input is now deprecated and should always be true.');
    }
  }

  /**
   * Allows control to properly handle slides append and removal
   */
  @Input() public manualControl = false;
  @Input() public disabled = false;
  @Input() public showDots = true;
  @Input() public stepSize = 1;
  @Input() public showArrows = true;
  @Input() public previousIcon = 'icon-arrow-left-24';
  @Input() public nextIcon = 'icon-arrow-right-24';
  @Input() public previousIconSize = IconSizes.large;
  @Input() public nextIconSize = IconSizes.large;
  @Input() public previousIconAltText = 'Previous Slide';
  @Input() public nextIconAltText = 'Next Slide';
  // Inner Arrows
  @Input() public showInnerArrows = true;
  /**
   * Moves arrows outside of content area of slides (ie. arrows do not overlay over slides).
   * This option is useful when dealing with multiple slides on a page in a desktop view.
   */
  @Input() public innerArrowsOutside = false;
  @Input() public previousInnerIcon = 'icon-arrow-left-24';
  @Input() public nextInnerIcon = 'icon-arrow-right-24';
  @Input() public previousInnerIconSize = IconSizes.large;
  @Input() public nextInnerIconSize = IconSizes.large;
  @Input() public previousInnerIconAltText = 'Previous Slide';
  @Input() public nextInnerIconAltText = 'Next Slide';

  // Events
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onInit: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onChange: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onChangeStart: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDragStart: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDragEnd: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDrag: EventEmitter<any> = new EventEmitter();

  /** @internal */
  // value that regulates behind-the-scenes carousel transformation
  looping = false;
  // index of current slide
  go = 0;
  // number of slides padding the start and end of the slide track
  slidePadding = 0;
  // index of previously current slide
  previousIndex = 0;
  // prevents control use while animation is running
  animating = false;
  // padding to center slide track when # of slides are below slidesVisible
  slideTrackBalance = 0;

  /**
   * Number of dots in terms of pages.
   * @internal
   */
  _pages = [];

  /** @internal */
  get slideWidth(): number {
    return 100 / this.slidesVisible;
  }

  private _changed = false;
  private _doneInit = false;

  // content height adjust
  private _carouselContentEl: any;
  private _widthLimiterEl: any;
  private _heightTimer: any;
  private _slidesChangeSubscription: Subscription;
  private _slideChangeTimer: any;
  private _lastHeight: number;
  private _initialRenderTimer: any;
  private _endLoopTimer: any;

  // number of slides to move when clicking next or prev
  private _slidesToMove: number;

  // saved coordinate to determine if swipe is left or right
  /** @internal */
  private _swipeCoord: [number, number];

  private _windowResizeSubscription: Subscription;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _cdr: ChangeDetectorRef,
    private _ngZone: NgZone,
    private _windowResizeService: HaloWindowResizeService,
  ) {}

  public ngAfterViewInit() {
    this.initialSlideFormat();
    this.previousIndex = this.go = this.slidePadding;
    this.recalculateHeights();
    this._slidesChangeSubscription = this.slides.changes.subscribe(() => {
      this.balanceSlideTrack();
      // When carousel dynamically changes number of slides visible or slides length then update # of pages and page indices
      this._calcPageIndices();
    });
    this._windowResizeSubscription = this._windowResizeService.resizeObservable$.subscribe((e) => this.onResize(e));
  }

  ngOnChanges(changes: SimpleChanges) {
    // redo check on heights when changing the amount of slides shown
    if (changes.slidesVisible && !changes.slidesVisible.firstChange) {
      this.recalculateHeights();
    }

    // When stepSize or slidesVisible is dynamically changed update pageDots and their indices.
    if (changes.stepSize || changes.slidesVisible) {
      this._calcPageIndices();
    }

    // reset any timers/clear timers for rotate
    if (changes.disableAutoRotate) {
      this.triggerTimer();
    }

    // clear fixed height
    if (this._carouselContentEl && changes.enableFixedHeight && !changes.enableFixedHeight.currentValue) {
      this._renderer.removeClass(this._carouselContentEl, 'legacy-c-carousel--fixed-height');
      this._renderer.removeStyle(this._carouselContentEl, 'height');
      this._renderer.removeStyle(this.slideTrack.nativeElement, 'height');
      this._renderer.removeStyle(this._widthLimiterEl, 'height');
      clearTimeout(this._heightTimer);
    }
  }

  ngAfterContentInit() {
    this._carouselContentEl = this._elementRef.nativeElement.firstElementChild;
    this._widthLimiterEl = this.slideTrack.nativeElement.querySelector('.legacy-c-carousel__width-limiter');

    this.balanceSlideTrack();
    this.resetState();
    this._ngZone.runOutsideAngular(() => {
      this._initialRenderTimer = setTimeout(() => {
        this.render();
        this._doneInit = true;
        this.recalculateHeights();
        this.triggerTimer();
        this.onInit.emit(null);
      });
    });

    // Force stepSize to be the number of slidesVisible. Prevent skipping of slides.
    if (this.slidesVisible < this.stepSize) {
      this.stepSize = this.slidesVisible;
    }

    this._calcPageIndices();
  }

  public ngOnDestroy() {
    clearTimeout(this._heightTimer);
    clearTimeout(this._initialRenderTimer);
    clearTimeout(this._endLoopTimer);
    clearInterval(this._slideChangeTimer);
    this._unsubscribeSlideChange();
    this._unsubscribeWindowResize();
  }

  public onResize(e) {
    this.balanceSlideTrack();
    this.resetState();
  }

  public render() {
    const width = this.getWidth();
    if (!width) {
      // not rendered case
      return;
    }

    if (this._changed) {
      let newIndex = this.go;

      if (this.go >= this.slides.length + this.slidePadding) {
        newIndex -= this.slides.length;
      } else if (this.go < this.slidePadding) {
        newIndex += this.slides.length;
      }

      this.onChange.emit(newIndex - this.slidePadding);
      this._changed = false;
    }

    const slideWidth = width / this.slidesVisible;
    this._renderer.setStyle(
      this.slideTrack.nativeElement,
      'transform',
      `translate3D(${-((this.slidePadding + this.go - this.previousIndex) * slideWidth)}px, 0, 0)`,
    );

    this.recalculateHeights();

    if (this.looping) {
      this._endLoopTimer = setTimeout(() => {
        this.looping = false;
        this.animating = false;
        this._cdr.detectChanges();
      });
    }
  }

  public clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
  }

  /**
   * This will animate the carousel to a certain slide index
   * @param index  The slide number to goto
   */
  public goSlide(index: number) {
    if (index === this.go - this.slidePadding || this.animating) {
      return;
    }

    this.onChangeStart.emit(null);
    this._changed = true;
    this.animating = true;

    this.go = this.clamp(index + this.slidePadding, 0, this.slides.length + this.slidePadding - 1);

    this.render();
    this.triggerTimer();
  }

  public nextSlide($event?: Event) {
    if (this.animating) {
      return;
    }

    this.onChangeStart.emit(null);
    this._changed = true;
    this.animating = true;

    if (this.go < this.slides.length + this.slidePadding) {
      // Move by the offset or stepSize
      this.go += this.getSlidesToMoveNext() || this.stepSize;
      this.resetSlidesToMove();
    } else {
      this.go -= this.slides.length;
    }

    this.render();
    if ($event) {
      this.triggerTimer();
    }
  }

  public prevSlide($event?: Event) {
    if (this.animating) {
      return;
    }

    this.onChangeStart.emit(null);
    this._changed = true;
    this.animating = true;

    if (this.go >= this.slidePadding) {
      // Move by the offset or stepSize
      this.go -= this.getSlidesToMovePrev() || this.stepSize;
      this.resetSlidesToMove();
    } else {
      this.go += this.slides.length;
    }

    this.render();
    if ($event) {
      this.triggerTimer();
    }
  }

  public transitionEnd(event) {
    if (this.go === this.previousIndex) {
      this.animating = false;
      return;
    }

    if (this.go === this.previousIndex + 1) {
      this.formatNextSlide();
    } else if (this.go === this.previousIndex - 1) {
      this.formatPreviousSlide();
    } else {
      this.formatSlideByDot();
    }

    if (this.go >= this.slides.length + this.slidePadding) {
      this.go -= this.slides.length;
    } else if (this.go < this.slidePadding) {
      this.go += this.slides.length;
    }

    this.previousIndex = this.go;
    this.looping = true;
    this.render();
  }

  public getWidth() {
    if (this._elementRef.nativeElement) {
      const innerContent = this.content.nativeElement;
      return innerContent.offsetWidth;
    }
  }

  public balanceSlideTrack() {
    this.slideTrackBalance =
      this.slidesVisible - this.slides.length > 0
        ? ((this.slidesVisible - this.slides.length) / 2) * this.slideWidth
        : 0;
  }

  public touchSwipe(e: any | TouchEvent, when: string) {
    if (this.disableDrag) {
      return;
    }
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    this.setCoords(coord, when);
  }

  public mouseSwipe(e: any, when: string) {
    if (this.disableDrag) {
      return;
    }
    const coord: [number, number] = [e.x, e.y];
    this.setCoords(coord, when);
  }

  private setCoords(coord: [number, number], when: string) {
    if (when === 'start') {
      this._swipeCoord = coord;
      this.clearAutoRotateTimer();
    } else if (when === 'end') {
      const [dx, dy] = [coord[0] - this._swipeCoord[0], coord[1] - this._swipeCoord[1]];
      this.restartAutoRotateTimer();
      // make sure swipe is long enough and closer to a horizontal swipe than a vertical swipe
      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy * 3)) {
        if (dx > 0) {
          this.prevSlide();
        } else if (dx < 0) {
          this.nextSlide();
        }
      }
    }
  }

  public preventImgDrag(e: any) {
    e.preventDefault();
  }

  /** Recalculate carousel slide heights, use this when opening modals, accordions, etc. */
  recalculateHeights() {
    clearTimeout(this._heightTimer);
    this.enableFixedHeightHandler();
    this.autoSlideHeightHandler();
    if (!this.enableFixedHeight && !this.autoSlideHeight) {
      this._renderer.setStyle(this._carouselContentEl, 'height', `${this.slideTrack.nativeElement.clientHeight}px`);
    }
    if (this.hasImagesLoading()) {
      this._ngZone.runOutsideAngular(() => {
        this._heightTimer = setTimeout(this.recalculateHeights.bind(this), 1000);
      });
    }
  }

  /**
   *
   * @internal
   * @param exp
   * @returns
   * @memberof LegacyCarouselComponent
   */
  _roundUpFunc(exp) {
    return Math.ceil(exp);
  }

  private hasImagesLoading() {
    const images: HTMLImageElement[] = [].slice.call(this._carouselContentEl.querySelectorAll('img'));
    return images.length && images.some((img) => !img.complete);
  }

  private enableFixedHeightHandler = () => {
    if (!(this.enableFixedHeight && this._doneInit)) {
      return;
    }

    // switch to height detection state
    this._renderer.addClass(this._carouselContentEl, 'legacy-c-carousel--detect-height');

    const newHeight = this.slideTrack.nativeElement.clientHeight;

    if (newHeight !== this._lastHeight) {
      this._lastHeight = newHeight;
      this._renderer.setStyle(this._carouselContentEl, 'height', `${newHeight}px`);
      this._renderer.setStyle(this.slideTrack.nativeElement, 'height', `${newHeight}px`);
      this._renderer.setStyle(this._widthLimiterEl, 'height', `${newHeight}px`);
    }

    this._renderer.removeClass(this._carouselContentEl, 'legacy-c-carousel--detect-height');
    this._renderer.addClass(this._carouselContentEl, 'legacy-c-carousel--fixed-height');
  };

  private autoSlideHeightHandler = () => {
    if (!this.enableFixedHeight && this.autoSlideHeight && this._doneInit) {
      const slidesArr = this.slides.toArray();
      let newIndex = this.go - this.slidePadding;
      if (newIndex >= slidesArr.length) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = slidesArr.length - 1;
      }
      const displayedSlides = slidesArr.slice(newIndex, newIndex + this.slidesVisible);
      const currentHeight = Math.max(...displayedSlides.map((slide) => slide.getContentHeight()));
      if (this._carouselContentEl.clientHeight !== currentHeight) {
        this._renderer.setStyle(this._carouselContentEl, 'height', `${currentHeight}px`);
      }
    }
  };

  private resetState() {
    this.removeTextNodes();
    this.calculateSlidePadding();
    this.animating = false;

    // prevent slides from jumping back and forth
    if (!this.manualControl) {
      // handle removals
      this.go = Math.min(this.go + this.slidePadding, this.slides.length - this.slidesVisible);
    }

    // re-render controls for when length of slides change
    this._cdr.detectChanges();

    this.render();
  }

  private triggerTimer() {
    this.clearAutoRotateTimer();
    this.restartAutoRotateTimer();
  }

  private clearAutoRotateTimer() {
    clearInterval(this._slideChangeTimer);
  }

  private restartAutoRotateTimer() {
    if (!this.disableAutoRotate) {
      this._ngZone.runOutsideAngular(() => {
        this._slideChangeTimer = setInterval(() => {
          this.nextSlide();
          this._cdr.detectChanges();
        }, this.slideDuration * 1000);
      });
    }
  }

  // format the original carousel so that the 0th index is the first slide to appear on the slide track
  private initialSlideFormat() {
    this.calculateSlidePadding();
    for (let x = 0; x < this.slidePadding; x++) {
      this.formatPreviousSlide();
    }
    this.removeTextNodes();
  }

  // format the carousel so that the frontmost slide is now at the end of the slide track
  private formatNextSlide() {
    const frontSlide = this._widthLimiterEl.firstElementChild;
    this._renderer.appendChild(this._widthLimiterEl, frontSlide);
  }

  // format the carousel so that the endmost slide is now at the front of the slide track
  private formatPreviousSlide() {
    const backSlide = this._widthLimiterEl.lastElementChild;
    this._renderer.insertBefore(this._widthLimiterEl, backSlide, this._widthLimiterEl.firstElementChild);
  }

  // format the carousel based on dot selection
  private formatSlideByDot() {
    if (this.go > this.previousIndex) {
      for (let x = 0; x < this.go - this.previousIndex; x++) {
        this.formatNextSlide();
      }
    } else if (this.go < this.previousIndex) {
      for (let x = 0; x < this.previousIndex - this.go; x++) {
        this.formatPreviousSlide();
      }
    }
  }

  /**
   * Remove text nodes that have been inserted in between slides
   * Angular can handle this if `preserveWhitespaces` is set to `false`
   * @see https://css-tricks.com/fighting-the-space-between-inline-block-elements/
   */
  private removeTextNodes() {
    for (const n of this._widthLimiterEl.childNodes) {
      if (n.nodeType === Node.TEXT_NODE) {
        this._renderer.removeChild(this._widthLimiterEl, n);
      }
    }
  }

  private calculateSlidePadding() {
    const slidesArr = this.slides.toArray();
    if ((slidesArr.length - this.slidesVisible) / 2 >= this.stepSize) {
      this.slidePadding = this.stepSize;
    } else {
      this.slidePadding =
        slidesArr.length - this.slidesVisible - this.stepSize >= 0
          ? slidesArr.length - this.slidesVisible - this.stepSize
          : 0;
    }
  }

  private resetSlidesToMove() {
    this._slidesToMove = null;
  }

  /**
   * Used with changeWithStepOffset.
   * Gets the number of slides to move when clicking next,
   * either null, offset or slidesVisible.
   * @memberof LegacyCarouselComponent
   */
  private getSlidesToMoveNext() {
    // Assume the number of slides to move is the stepSize
    this._slidesToMove = this.go - this.slidePadding + this.stepSize;

    /**
     * If number of slides remaining slides to show is less than number of slides visible
     * Set slidesToMove to the amount remaining slides
     * Else slidesToMove will be null and will move stepSize.
     */
    if (this.slides.length - this._slidesToMove < this.slidesVisible) {
      this._slidesToMove = this.slides.length - this.slidesVisible + this.slidePadding - this.go;
    } else {
      this.resetSlidesToMove();
    }

    /**
     * If the stepSize is not equal to slidesVisible then we need to move
     * by the number of slides visible when looping occurs.
     */
    if (this.go - this.slidePadding + this.slidesVisible === this.slides.length) {
      this._slidesToMove = this.slidesVisible;
    }

    return this._slidesToMove;
  }

  /**
   * Used with changeWithStepOffset.
   * Gets the number of slides to move when clicking prev,
   * either null, offset or slidesVisible.
   * @memberof LegacyCarouselComponent
   */
  private getSlidesToMovePrev() {
    // Assume the number of slides to move is the stepSize
    this._slidesToMove = this.go - this.slidePadding - this.stepSize;

    /**
     * If slidesToMove is less than 0 then
     * slidesToMove would be 0 or the offset amount
     * Else slidesToMove will be null and will move stepSize.
     */
    if (this._slidesToMove < 0) {
      this._slidesToMove = this.go - this.slidePadding;
    } else {
      this.resetSlidesToMove();
    }

    /**
     * If last slide is visible, move back the offset amount.
     */
    if (this.go - this.slidePadding === this.slides.length - this.slidesVisible) {
      this._slidesToMove = (this.slides.length - this.slidesVisible) % this.stepSize;
    }

    /**
     * If the stepSize is not equal to slidesVisible then we need to move
     * by the number of slides visible when looping occurs.
     */
    if (this.go - this.slidePadding === 0) {
      this._slidesToMove = this.slidesVisible;
    }

    return this._slidesToMove;
  }

  /**
   * Calculate number of pages(dots)
   * Assign the index to which each page goes to.
   */
  private _calcPageIndices() {
    let breakPoint = 0;
    let counter = 0;

    this._pages = []; // Clear indexs from array
    if (this.slides) {
      // Logic loop to determine number of page dots & push index into array.
      while (breakPoint < this.slides.length) {
        breakPoint = counter + this.slidesVisible;
        this._pages.push(counter);
        counter += this.stepSize;
      }
      this._pages[this._pages.length - 1] = this.slides.length - this.slidesVisible; // Last index dot should be length - slidesVisible
    }
  }

  private _unsubscribeSlideChange() {
    if (this._slidesChangeSubscription) {
      this._slidesChangeSubscription.unsubscribe();
    }
  }

  private _unsubscribeWindowResize() {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
  }
}

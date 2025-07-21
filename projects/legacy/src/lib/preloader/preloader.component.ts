import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'legacy-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss'
})
export class PreloaderComponent {
  /**
   * Text for displaying as the loading screen title.
   */
  @Input() public loadingTitle: string;
  /**
   * Text for displaying as the loading screen message.
   */
  @Input() public loadingMessage: string;
  /**
   * Loading progress message.
   */
  @Input() public loadingProgress: string;
  /**
   * Positions the loading message. Values: 'top', 'bottom', 'left', 'right'.
   */
  @Input() public loadingMessagePosition = 'center';
  /**
   * Sets if the preloader should take up the whole page.
   */
  @Input() public fullPageLoader = false;
  /**
   * Input to control when the preloader should be displayed.
   */

  /**
   * Input to control when the preloader should be displayed.
   */
  @Input() loading = true;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    // check if going from loading to finished loading
    if (
      changes.loading
      && changes.loading.previousValue
      && !changes.loading.currentValue
    ) {
      this.loaded();
    }
  }

  /**
   * Activates preloader laoding.
   */
  load() {
    this.loading = true;
    this._cdr.markForCheck();
  }

  /**
   * Stops preloader loading.
   */
  loaded() {
    this.loading = false;
    this._cdr.markForCheck();
  }
}

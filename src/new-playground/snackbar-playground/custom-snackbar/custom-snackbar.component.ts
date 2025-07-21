import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IconModule } from 'atlas-icon';

@Component({
  selector: 'custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IconModule],
})
export class CustomSnackbarComponent {
  title: string;
  message: string;
  label: string;
  conclusion: string;
  linkUrl: string;
  closeClick: (() => void) | undefined;

  constructor() {}

  onClick() {
    window.open(this.linkUrl, '_blank');
  }

  closeSnackbar() {
    if (this.closeClick) {
      this.closeClick();
    }
  }
}

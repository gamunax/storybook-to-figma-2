// Import the core angular services.
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ThemingService } from 'atlas-cdk';
import { config } from './list.theming';

/**
 * The list component displays list items
 */
@Component({
  selector: 'atlas-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
    [ngClass]="[
      'atlas-list',
      'list',
      listCustomClass,
    ]"
    >
      <ng-content></ng-content>
    </div>`,
})

export class ListComponent {
  /** Create a custom class that gets added to the list elem */
  @Input() listCustomClass?: string = '';

  constructor(
    private themingService: ThemingService
  ) {
    this.themingService.applyConfig(config);
  }

}
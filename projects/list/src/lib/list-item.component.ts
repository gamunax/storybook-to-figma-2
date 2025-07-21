import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import {
  Actions,
  Colors
} from "atlas-cdk";
import {
  ListItem
} from "./list.const";

/**
 * The list item component is used to display a single item
 */
@Component({
  selector: 'atlas-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div (click)="emitItem(item)" 
        [ngClass]="
          [
            'atlas-list-item',
            item?.reverse ? 'list-reverse-item' : 'list-item',
            typography,
            listItemCustomClass,
            'list-item-' + (action ? action: color),
            'list-item--level-' + item?.level,
            item?.disabled ? 'list-item-' + (action ? action : color) + '-disabled' : '',
            item?.selected ? 'list-item-' + (action ? action : color) + '-selected' : '',
            item?.selected && item?.reverse ? 'list-reverse-item-' + (action ? action : color) + '-selected' : '',
            item?.dense ? 'list-item-size-dense' : 'list-item-size-default',
          ]">
        <ng-content></ng-content>
    </div>
        `,
  styleUrls: ['./list-item.component.scss'],

})

export class ListItemComponent {
  /** The value of the list item */
  @Input() item: ListItem | any;
  /** Set the list item typography class */
  @Input() typography = 'typographyStyles-body-medium';

  /** 
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Set the select action 
  */
  @Input() action: Actions;

  /** Set the select color */
  @Input() color: Colors = Colors.brand;
  /** Output from clicking an Item */
  @Output() select: EventEmitter < any > ;
  /** Create a custom class that gets added to the list item elem */
  @Input() listItemCustomClass ? : string = '';

  constructor() {
    this.select = new EventEmitter();
  }

  /** Fires when an Option that is not disabled or selected is clicked */
  emitItem(value: Event) {
    this.select.emit(value);
  }

}
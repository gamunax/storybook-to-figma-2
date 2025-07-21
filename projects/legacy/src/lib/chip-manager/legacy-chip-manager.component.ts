import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterContentChecked,
  ChangeDetectionStrategy,
} from '@angular/core';

export interface LegacyChipManagerData {
  label: string;
  badgeTheme: string;
  badgeContent: string;
  dismissDisabled: boolean;
  chipTheme?: string;
  chipSize?: string;
}

@Component({
  selector: 'legacy-chip-manager',
  templateUrl: './legacy-chip-manager.component.html',
  styleUrls: ['./legacy-chip-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyChipManagerComponent implements AfterContentChecked {

  @Input() public data: LegacyChipManagerData[] = [];
  @Input() public isUserInput = true;
  @Input() public hasBadges = false;
  @Input() public placeholder = 'Add a new chip';
  @Input() public caption = 'Add a Chip';
  @Input() public selectAll = '--Select All--';
  @Input() public deselectAll = '--Deselect All--';
  @Input() public selectAllOption = false;
  @Input() public deselectAllOption = false;
  @Input() public buttonClass = 'mos-c-button mos-t-button--primary-alt';
  @Input() public selectColSize = '2';

  public newChip: any;
  public userInputChip = '';
  @Input() public chips: LegacyChipManagerData[] = [];
  @Input() public chipLabels: string[] = [];
  @Input() public userInputChips: string[] = [];

  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onChipRemoved: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('selectElement') public selectElement: any;

  public ngAfterContentChecked() {
    this.chipLabels = this.chips.map((el) => el.label);
    this.newChip = this.caption;
  }

  public addCustomChip() {
    if (!this.userInputChip) {
      return;
    }
    if (this.userInputChips.indexOf(this.userInputChip) > -1
      || /^\s+$/.test(this.userInputChip)) {
      this.userInputChip = '';
      return;
    }
    this.userInputChips.push(this.userInputChip);
    this.onChange.emit(this.userInputChips);
    this.userInputChip = '';
  }

  /**
   * @internal
   */
  public chipHandler() {
    switch (this.newChip) {
      case this.selectAll:
        this.selectAllChip();
        break;
      case this.deselectAll:
        this.deselectAllChip();
        break;
      default:
        this.addChip();
    }
    if (this.selectElement) {
      this.selectElement.nativeElement.selectedIndex = 0;
    }
  }

  public addChip() {
    const chip = this.data[this.newChip];
    if (this.chipLabels.indexOf(chip.label) > -1) {
      this.newChip = -1;
      return;
    }
    this.chips.push(chip);
    this.chipLabels.push(chip.label);
    this.onChange.emit(this.chips);
    this.newChip = -1;
  }

  /**
   * @internal
   * Select all chips from data
   */
  public selectAllChip() {
    this.chips = [...this.data];
    this.chipLabels = this.chips.map(chip => chip.label);
    this.onChange.emit(this.chips);
  }

  /**
   * @internal
   * Deselect all chips from data
   */
  public deselectAllChip() {
    this.chips = [];
    this.chipLabels = [];
    this.onChange.emit(this.chips);
  }

  public deleteUserInputChip(index: number) {
    this.userInputChips.splice(index, 1);
    this.onChange.emit(this.userInputChips);
  }

  public deleteChip(index: number) {
    if (!this.chips[index].dismissDisabled) {
      this.chips.splice(index, 1);
      this.chipLabels.splice(index, 1);
      this.onChange.emit(this.chips);
      this.onChipRemoved.emit(index);
    }
  }
}

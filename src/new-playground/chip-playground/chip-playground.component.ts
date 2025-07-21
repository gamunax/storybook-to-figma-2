import { Component } from '@angular/core';
import { CHIPS } from './chip.constant';
import { ChipStates } from './chip.interface';
import { Styles, ChipSizings, Colors } from 'atlas-cdk';

@Component({
  selector: 'chip-playground',
  templateUrl: './chip-playground.component.html',
  styleUrls: ['./chip-playground.component.scss']
})
export class ChipPlayground{
  colors = Object.values(Colors);
  chipStyles = [Styles.filled, Styles.outlined];
  chipSizes = Object.values(ChipSizings);
  chips: ChipStates[] = CHIPS;

  removeChip(event: any) {
    console.log(event);
  }

  selectionChip(event: any) {
    console.log(event);
  }
 }
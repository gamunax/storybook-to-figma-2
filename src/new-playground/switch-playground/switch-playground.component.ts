import { Component } from '@angular/core';
import { Actions, IconSizes, SwitchSizings } from 'atlas-cdk';

@Component({
  selector: 'switch-playground',
  templateUrl: './switch-playground.component.html',
  styleUrls: ['./switch-playground.component.scss']
})
export class SwitchPlayground{

  actions = Actions;
  switchSizings = SwitchSizings;
  switchV: boolean = true;
  switchTsValue: boolean = true;

  changeSwitch(value: boolean): void {
    this.switchV = value;
    console.log('active', this.switchV);
  }

  changeSwitchTs(): void {
    this.switchTsValue = !this.switchTsValue;
    console.log('active', this.switchTsValue);
  }


 }
import { Component } from '@angular/core';
import { FormGroup, UntypedFormControl } from '@angular/forms';
import { Actions,  IconSizes } from 'atlas-cdk';

@Component({
  selector: 'radio-playground',
  templateUrl: './radio-playground.component.html',
  styleUrls: ['./radio-playground.component.scss']
})
export class RadioPlayground {
  actions = Actions;
  iconSizes = IconSizes
  testForm: FormGroup;
  radioGroupElements = [
    { id: 1, label: 'Brand 1', value: 'brand1', disabled: false },
    { id: 2, label: 'Brand 2', value: 'brand2', checked: true },
    { id: 3, label: 'Brand 3', value: 'brand3' },
  ];
  radioGroupElements1 = [
    { id: 11, label: 'Brand 11', value: 'brand11' },
    { id: 22, label: 'Brand 22', value: 'brand22', checked: true },
    { id: 33, label: 'Brand 33', value: 'brand33', disabled: true },
  ];
  radioGroupElements2 = [
    { id: 111, label: 'Brand 111', value: 'brand111', disabled: false },
    { id: 222, label: 'Brand 222', value: 'brand222', checked: true },
    { id: 333, label: 'Brand 333', value: 'brand333' },
  ];
  constructor() {
      this.testForm = new FormGroup({
        radioElement: new UntypedFormControl({ value: 'brand222', disabled: false}),
      });
  }
  seeValue() {
    console.log('see value from form=', this.testForm.get('radioElement').value);
  }
}
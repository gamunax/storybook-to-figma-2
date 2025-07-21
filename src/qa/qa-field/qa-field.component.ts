import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ThemingService, defaultConfig } from 'atlas-cdk';
import { FieldSize, FieldVariants } from 'atlas-field';
import { IconSizes } from 'atlas-icon';
import { QaField } from './qa-field.const';
@Component({
  selector: 'qa-field',
  templateUrl: './qa-field.component.html',
  styleUrls: ['./qa-field.component.scss']
})
export class QaFieldComponent implements OnInit {

  constructor(themingService: ThemingService) {
    themingService.applyConfig(defaultConfig)
   }
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl1 = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl2 = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl3 = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl4 = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl5= new FormControl('', [Validators.required, Validators.email]);

  fieldvariant = FieldVariants;
  fieldsize = FieldSize;
  actions = Actions;
  iconSize = IconSizes

  items: QaField[] = [

    {
      action: Actions.primary,
      hideRM: false,
      size: FieldSize.small,
      variant: FieldVariants.outlined,
      placeholder: "TC7"
    },

    {
      action: Actions.primary,
      hideRM: true,
      size: FieldSize.medium,
      variant: FieldVariants.outlined,
      placeholder: "TC8"
    },

    {
      action: Actions.primary,
      hideRM: false,
      size: FieldSize.large,
      variant: FieldVariants.outlined,
      placeholder: "TC9"
    }
  ]

  items1: QaField[] = [ 
    {
      action: Actions.primary,
      hideRM: true,
      size: FieldSize.small,
      variant: FieldVariants.filled,
      placeholder: "TC10"
    },

    {
      action: Actions.primary,
      hideRM: false,
      size: FieldSize.medium,
      variant: FieldVariants.filled,
      placeholder: "TC11"
    },

    {
      action: Actions.primary,
      hideRM: true,
      size: FieldSize.large,
      variant: FieldVariants.filled,
      placeholder: "TC12"
    },  
  ]

  items2: QaField[] = [
    {
      action: Actions.error,
      hideRM: false,
      size: FieldSize.small,
      variant: FieldVariants.outlined,
      placeholder: "TC1",
      icon: "icon-home-24",
      isize: IconSizes.small,
      hint: "small outlined",
      emailFC: this.emailFormControl
    },

    {
      action: Actions.success,
      hideRM: true,
      size: FieldSize.medium,
      variant: FieldVariants.outlined,
      placeholder: "TC2",
      icon: "icon-home-24",
      isize: IconSizes.medium,
      hint: "medium outlined",
      emailFC: this.emailFormControl1
    },

    {
      action: Actions.secondary,
      hideRM: false,
      size: FieldSize.large,
      variant: FieldVariants.outlined,
      placeholder: "TC3",
      icon: "icon-home-24",
      isize: IconSizes.large,
      hint: "large outlined",
      emailFC: this.emailFormControl2
    },
  ]

  items3: QaField[] = [
    {
      action: Actions.secondary,
      hideRM: true,
      size: FieldSize.small,
      variant: FieldVariants.filled,
      placeholder: "TC4",
      icon: "icon-home-24",
      isize: IconSizes.small,
      hint: "small filled",
      emailFC: this.emailFormControl3
    },

    {
      action: Actions.secondary,
      hideRM: false,
      size: FieldSize.medium,
      variant: FieldVariants.filled,
      placeholder: "TC5",
      icon: "icon-home-24",
      isize: IconSizes.medium,
      hint: "medium filled",
      emailFC: this.emailFormControl4
    },

    {
      action: Actions.secondary,
      hideRM: true,
      size: FieldSize.large,
      variant: FieldVariants.filled,
      placeholder: "TC6",
      icon: "icon-home-24",
      isize: IconSizes.large,
      hint: "large filled",
      emailFC: this.emailFormControl5
    },
  ]

  

  ngOnInit(): void {
  }

}
import { Component } from '@angular/core';
import { Actions, IconSizes } from 'atlas-cdk';

@Component({
  selector: 'checkbox-playground',
  templateUrl: './checkbox-playground.component.html',
  styleUrls: ['./checkbox-playground.component.scss'],
})
export class CheckboxPlayground {
  actions = Actions;
  iconSizes = IconSizes;

  parentChecked = false;
  parentIndeterminate = false;
  child1Checked = false;
  child2Checked = false;

  childCheckbox1 = 'childCheckbox1';
  childCheckbox2 = 'childCheckbox2';

  onParentChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.parentChecked = input.checked;
    this.parentIndeterminate = input.indeterminate;

    this.child1Checked = this.parentChecked;
    this.child2Checked = this.parentChecked;
  }

  onChildChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.id === this.childCheckbox1) {
      this.child1Checked = input.checked;
    } else if (input.id === this.childCheckbox2) {
      this.child2Checked = input.checked;
    }

    const allChecked = this.child1Checked && this.child2Checked;
    const noneChecked = !this.child1Checked && !this.child2Checked;

    this.parentChecked = allChecked;
    this.parentIndeterminate = !allChecked && !noneChecked;
  }
}

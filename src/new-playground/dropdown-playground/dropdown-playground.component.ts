import { Component } from '@angular/core';
import { ButtonSizings, Colors } from 'atlas-cdk';

@Component({
  selector: 'dropdown-playground',
  templateUrl: './dropdown-playground.component.html',
  styleUrls: ['./dropdown-playground.component.scss']
})
export class DropdownPlayground {
  colors = Colors;
  parentIndeterminate = false;
  parentChecked = false;
  child1Checked = false;
  child2Checked = false;
  childCheckbox1 = 'childCheckbox1';
  childCheckbox2 = 'childCheckbox2';
  buttonSizeSmall = ButtonSizings.small;

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
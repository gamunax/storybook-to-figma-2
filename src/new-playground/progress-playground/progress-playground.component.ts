import { Component, ViewChild } from '@angular/core';
import { Actions, ButtonSizings, ButtonVariants } from 'atlas-cdk';
import { ElementRef } from 'react';

@Component({
  selector: 'progress-playground',
  templateUrl: './progress-playground.component.html',
  styleUrls: ['./progress-playground.component.scss']
})
export class ProgressPlayground {
  actions = Actions;
  buttonSizings = ButtonSizings;
  buttonVariants = ButtonVariants;
  @ViewChild('percentValue') percentValueInput;
  @ViewChild('percentValueCircular') percentValueInputCircular;
  @ViewChild('percentValueI') percentValueInputI;
  @ViewChild('percentValueCircularI') percentValueInputCircularI;
  //@ViewChild('progressValue') progressValue;
  progressValue = 20;
  progressValueCircular = this.progressValue;
  progressValueI = this.progressValue;
  progressValueCircularInd = this.progressValueI;

  updateProgressValue() {
    const inputValue = this.percentValueInput.nativeElement.value;
    const parsedValue = Number(inputValue);

    if (parsedValue && parsedValue >= 0 && parsedValue <= 100) {
      // Update the progress value within a valid range (0-100)
      this.progressValue = parsedValue;
    } else {
      // Handle invalid input (e.g., non-numeric, out-of-range)
      console.error('Invalid input. Please enter a number between 0 and 100.');
    }
  }
  updateProgressValueCircular() {
    const inputValue = this.percentValueInputCircular.nativeElement.value;
    const parsedValue = Number(inputValue);

    if (parsedValue && parsedValue >= 0 && parsedValue <= 100) {
      // Update the progress value within a valid range (0-100)
      this.progressValueCircular = parsedValue;
    } else {
      // Handle invalid input (e.g., non-numeric, out-of-range)
      console.error('Invalid input. Please enter a number between 0 and 100.');
    }

  }
  updateProgressValueI() {
    const inputValue = this.percentValueInputI.nativeElement.value;
    const parsedValue = Number(inputValue);

    if (parsedValue && parsedValue >= 0 && parsedValue <= 100) {
      // Update the progress value within a valid range (0-100)
      this.progressValueI = parsedValue;
    } else {
      // Handle invalid input (e.g., non-numeric, out-of-range)
      console.error('Invalid input. Please enter a number between 0 and 100.');
    }
  }
  updateProgressValueCircularI() {
    const inputValue = this.percentValueInputCircularI.nativeElement.value;
    const parsedValue = Number(inputValue);

    if (parsedValue && parsedValue >= 0 && parsedValue <= 100) {
      // Update the progress value within a valid range (0-100)
      this.progressValueCircularInd = parsedValue;
    } else {
      // Handle invalid input (e.g., non-numeric, out-of-range)
      console.error('Invalid input. Please enter a number between 0 and 100.');
    }
    console.log('pasoooo', parsedValue, this.progressValueCircularInd);
  }
}
import { Component } from '@angular/core';
import { Actions, BoxShadows } from 'atlas-cdk';

@Component({
  selector: 'slider-playground',
  templateUrl: './slider-playground.component.html',
  styleUrls: ['./slider-playground.component.scss']
})
export class SliderPlayground {
  actions = Actions;
  boxShadows = BoxShadows;

  inputSlider(event: any): void {
    console.log('slider', event)
  }
}
import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BoxShadows, Actions, ButtonVariants, Colors, Styles } from 'atlas-cdk';
import { ButtonSizings } from 'atlas-button';

@Component({
  selector: 'alert-playground',
  templateUrl: './alert-playground.component.html',
  styleUrls: ['./alert-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AlertPlayground implements AfterViewInit {
  actions = Actions;
  colors = Colors;
  styles = Styles;
  boxShadows = BoxShadows;
  buttonSizings = ButtonSizings;
  buttonVariants = ButtonVariants;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  changeAlert(ev) {
    console.log('action', ev.target);
  }

  actionAlert(ev) {
    console.log('close', ev.target);
    this.cdr.detectChanges();
  }

  closeAlert(ev) {
    console.log('close', ev.target);
    this.cdr.detectChanges();
  }
}
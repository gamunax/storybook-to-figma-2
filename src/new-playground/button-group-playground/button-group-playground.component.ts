import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Actions, ButtonSizings, ButtonVariants, Radii, Styles, Colors } from 'atlas-cdk';
@Component({
  selector: 'button-group-playground',
  templateUrl: './button-group-playground.component.html',
  styleUrls: ['./button-group-playground.component.scss'],
})
export class ButtonGroupPlayground {
  actions = Actions;
  buttonSizings = ButtonSizings;
  buttonVariants = ButtonVariants;
  radii = Radii;
  style = Styles;
  colors = Colors;
  menuItems: any[] = [
    {
      name: 'Item 1',
      disabled: false,
      path: '/item1',
    },
    {
      name: 'Item 2',
      disabled: false,
      path: '/item2',
    },
    {
      name: 'Item 3',
      disabled: false,
      path: '/item3',
    },
    {
      name: 'Item 4',
      disabled: true,
      path: '/item4',
    },
  ];
  @ViewChild('iconTemplate1') iconTemplate1: TemplateRef<any>;
  @ViewChild('iconTemplate2') iconTemplate2: TemplateRef<any>;
  @ViewChild('iconTemplate3') iconTemplate3: TemplateRef<any>;
  public btnConfig: any = [];

  ngAfterViewInit(): void {
    this.btnConfig.push(
      { content: this.iconTemplate1, event: () => console.log('clicked 1') },
      { content: this.iconTemplate2, event: () => console.log('clicked 2') },
      { content: this.iconTemplate3, event: () => console.log('clicked 3') },
    );
  }

  handleClick(event: Event): void {
    alert('Button clicked!');
  }
}

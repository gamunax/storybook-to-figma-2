import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ButtonModule, ButtonComponent } from 'atlas-button';
import { ThemingHelperComponent, CdkModule } from 'atlas-cdk';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CdkModule
  ],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    this.registerElements([
      {tag: 'hui-button', klass: ButtonComponent},
      {tag: 'hui-theming-helper', klass: ThemingHelperComponent},
    ]);
  }

private registerElements(components: {tag: string, klass: any}[]) {
  components.forEach( compo => {
    customElements.define(compo.tag, createCustomElement(compo.klass, {injector: this.injector}));
  })
}
}

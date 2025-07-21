import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FooterComponent, FooterCustomLinksComponent, FooterSocialLinksComponent } from './footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [FooterComponent, FooterCustomLinksComponent, FooterSocialLinksComponent],
  exports: [FooterComponent, FooterCustomLinksComponent, FooterSocialLinksComponent],
  providers: [],
})
export class FooterModule { }

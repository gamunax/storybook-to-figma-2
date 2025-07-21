/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule],
    exports: [FooterComponent],
    providers: [],
})
export default class SharedModule {}

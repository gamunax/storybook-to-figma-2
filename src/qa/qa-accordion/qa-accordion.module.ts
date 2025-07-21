import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaAccordionComponent } from './qa-accordion.component';
import { AccordionModule } from 'atlas-accordion';
import { RouterModule } from '@angular/router';
import { IconModule } from 'atlas-icon';
import { ButtonModule } from 'atlas-button';


@NgModule({
  declarations: [
    QaAccordionComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    IconModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaAccordionComponent
      }
    ])
  ]
})
export class QaAccordionModule { }
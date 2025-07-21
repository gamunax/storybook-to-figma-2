import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'atlas-button';
import { 
  AccordionComponent, 
  AccordionItemComponent, 
  AccordionHeadingComponent, 
  AccordionSubHeadingComponent, 
  AccordionContentComponent,
  AccordionExpandComponent, 
} from './accordion.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionHeadingComponent,
    AccordionSubHeadingComponent,
    AccordionContentComponent,
    AccordionExpandComponent
  ],
  imports: [
    ButtonModule,
    CommonModule
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionHeadingComponent,
    AccordionSubHeadingComponent,
    AccordionContentComponent,
    AccordionExpandComponent
  ]
})
export class AccordionModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';
import { CardComponent, CardContentComponent, CardFooterComponent, CardHeaderActionComponent, CardHeaderComponent, CardMediaContentComponent, CardSubHeaderComponent } from './card.component';



@NgModule({
  declarations: [
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardSubHeaderComponent,
    CardMediaContentComponent,
    CardHeaderActionComponent,
    CardFooterComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
  ],
  exports: [
    CardComponent,
    CardContentComponent,
    CardMediaContentComponent,
    CardHeaderActionComponent,
    CardHeaderComponent,
    CardSubHeaderComponent,
    CardFooterComponent
  ]
})
export class CardModule { }

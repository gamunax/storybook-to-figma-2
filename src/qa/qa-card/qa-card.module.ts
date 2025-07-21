import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';
import { QaCardComponent } from './qa-card.component';
import { AvatarModule } from 'atlas-avatar';
import { ButtonModule } from 'atlas-button';
import { CardModule } from 'atlas-card';

@NgModule({
  declarations: [
    QaCardComponent,
  ],
  imports: [
    CommonModule,
    CdkModule,
    AvatarModule,
    ButtonModule,
    CardModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaCardComponent
      }
    ])
  ]
})
export class QaCardModule {}

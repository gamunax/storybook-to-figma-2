import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'atlas-avatar';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { StepperComponent } from './stepper.component';

@NgModule({
  declarations: [StepperComponent],
  imports: [CommonModule, CdkModule, IconModule, AvatarModule],
  exports: [StepperComponent],
})
export class StepperModule {}

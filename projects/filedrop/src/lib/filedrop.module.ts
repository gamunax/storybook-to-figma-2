import { NgModule } from '@angular/core';
import { ButtonModule } from 'atlas-button';
import { FiledropComponent } from './filedrop.component';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { CommonModule } from '@angular/common';
import { ProgressModule } from 'atlas-progress';
import { IconModule } from 'atlas-icon';
import { ShortenMiddlePipe } from './pipes/shorten-middle.pipe';



@NgModule({
  declarations: [
    FiledropComponent,
    DragAndDropDirective,
    ShortenMiddlePipe
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    ProgressModule
  ],
  exports: [
    FiledropComponent
  ]
})
export class FiledropModule { }

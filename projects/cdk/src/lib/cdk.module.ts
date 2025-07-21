import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CamelCaseSpacePipe } from './pipes/camelCase-space.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { SortPipe } from './pipes/sort.pipe';

import { ThemingHelperComponent } from './theme/theming-helper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ThemingHelperComponent,
    JoinPipe,
    CamelCaseSpacePipe,
    SortPipe
  ],
  exports: [
    ThemingHelperComponent,
    SortPipe
  ],
  providers: [
    CamelCaseSpacePipe
  ]
})
export class CdkModule {
  static forRoot(): ModuleWithProviders<CdkModule> {
    return {
      ngModule: CdkModule
    };
  }
 }
 
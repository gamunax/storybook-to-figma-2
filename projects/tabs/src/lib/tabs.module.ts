import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule, HaloWindowResizeService } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { MenuModule } from 'atlas-menu';
import { ListModule } from 'atlas-list';
import { TabComponent, TabContentComponent, TabGroupComponent, TabLabelDirective } from './tabs.component';
import { ButtonModule } from 'atlas-button';

@NgModule({
  declarations: [
    TabComponent,
    TabLabelDirective,
    TabContentComponent,
    TabGroupComponent,
  ],
  imports: [
    CommonModule, 
    CdkModule, 
    IconModule,
    ListModule,
    ButtonModule,
    MenuModule
  ],
  exports: [
    TabComponent,
    TabLabelDirective,
    TabContentComponent,
    TabGroupComponent,
  ],
  providers: [
    HaloWindowResizeService
  ],
})
export class TabsModule {}

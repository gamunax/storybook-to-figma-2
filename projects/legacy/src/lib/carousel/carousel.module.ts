import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { LegacyCarouselComponent, LegacyCarouselSlideComponent } from './carousel.component';

@NgModule({
  imports: [CommonModule, RouterModule, PortalModule, CdkModule, IconModule],
  declarations: [LegacyCarouselComponent, LegacyCarouselSlideComponent],
  exports: [LegacyCarouselComponent, LegacyCarouselSlideComponent],
  providers: [],
})
export class CarouselModule {}

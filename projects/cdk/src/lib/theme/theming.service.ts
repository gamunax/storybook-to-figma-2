import { Injectable } from '@angular/core';

import { ThemingServiceGlobal } from './theming.service.global';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
/**
 * A class helper for theming an application.
 * It provides an injectable to use it in Angular.
 */
export class ThemingService extends ThemingServiceGlobal {
  constructor(breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);
  }
}

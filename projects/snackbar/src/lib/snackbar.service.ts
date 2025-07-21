import { Injectable, EventEmitter, ComponentFactoryResolver, ChangeDetectorRef, Injector, ApplicationRef, ComponentRef, EmbeddedViewRef, Type } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { SnackbarInjector } from './snackbar-injector';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarConfig } from './snackbar.config';

// export interface ToastOptions {
//   type?: 'success-light' | 'alert-light' | 'info-light' | 'warning-light';
//   title?: string;
//   autoDismiss?: boolean;
//   message: string;
// }

@Injectable()
export class SnackbarService {
  snackbarComponentRef: ComponentRef<SnackbarComponent>;

  constructor(
    private _cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private _injector: Injector,
  ) {}

  /**
   * Creates and shows a page level toast (defaults to info type)
   *
   */
  create(options: any, component?: ComponentType<any>) {
    if (!options) {
      return false;
    }
    // Destroy any existing snackbar before creating a new one
    this.destroySnackbar();
    const transformedOptions = { ...options } as any;

    if (options.type) {
      transformedOptions.type = `${options.type}-light`;
    }

    const map = new WeakMap();
    map.set(SnackbarConfig, options);

    const componentFactory = this._cfr.resolveComponentFactory(SnackbarComponent);
    const componentRef = componentFactory.create(new SnackbarInjector(this._injector, map));

    if (component && componentRef?.instance) {
      componentRef.instance.setExternalComponent(component, transformedOptions);
    }

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.snackbarComponentRef = componentRef;

    const { autoclose } = options;

    if( autoclose > 0 ) {
      setTimeout(()=> {
        if(autoclose) {
          this.destroySnackbar()
        }
      }, autoclose);
    }
   
    return this.snackbarComponentRef;
  }

  // /**
  //  * Convenience function for creating an alert
  //  *
  //  */
  // createAlert(options: any) {
  //   this.create({ ...options, type: 'alert-light' });
  // }

  // /**
  //  * Convenience function for creating a success toast
  //  */
  // createSuccess(options: any) {
  //   this.create({ ...options, type: 'success-light' });
  // }

  // /**
  //  * Convenience function for creating a warning toast
  //  */
  // createWarning(options: any) {
  //   this.create({ ...options, type: 'warning-light' });
  // }

  destroySnackbar() {
    if (this.snackbarComponentRef) {
      this.appRef.detachView(this.snackbarComponentRef.hostView);
      this.snackbarComponentRef.destroy();
      this.snackbarComponentRef = null;
    }
  }
}

import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { AlertInjector } from './alert-injector';
import { AlertComponent } from './alert.component';
import { AlertConfig } from './alert.config';

@Injectable()
export class AlertService {
  private snackbarComponentRef: ComponentRef<AlertComponent> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Create and display the AlertComponent with the given configuration.
   * @param options - Configuration object for the alert.
   * @returns ComponentRef of the created AlertComponent, or false if creation failed.
   */
  create(options: AlertConfig): ComponentRef<AlertComponent> | false {
    if (!options) {
      console.warn('Alert creation failed: options are missing.');
      return false;
    }

    // Destroy any existing alert snackbar before creating a new one
    this.destroyAlertSnackbar();

    const alertConfigMap = new WeakMap();
    alertConfigMap.set(AlertConfig, options);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const projectableNodes = this.createProjectableNodes(options);

    const alertComponentRef = componentFactory.create(
      new AlertInjector(this.injector, alertConfigMap),
      projectableNodes
    );

    this.appRef.attachView(alertComponentRef.hostView);

    const domElem = (alertComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    if (!domElem) {
      console.error('Failed to append alert to DOM: root element not found.');
      return false;
    }
    document.body.appendChild(domElem);

    // Assign properties in bulk if they are defined
    this.assignProperties(alertComponentRef.instance, options);

    this.snackbarComponentRef = alertComponentRef;
    this.handleAutoClose(options.autoclose);

    return this.snackbarComponentRef;
  }

  /**
   * Handles the auto-close functionality based on the provided timeout.
   * @param autoclose - Time (in ms) after which the alert should automatically close.
   */
  private handleAutoClose(autoclose?: number): void {
    if (autoclose && autoclose > 0) {
      setTimeout(() => this.destroyAlertSnackbar(), autoclose);
    }
  }

  /**
   * Creates projectable nodes for the AlertComponent ng-content slots.
   * @param options - The alert configuration object containing title and content.
   * @returns A 2D array of projectable nodes.
   */
  private createProjectableNodes(options: AlertConfig): Node[][] {
    const titleNode = this.createNodeWithContent('atlas-alert-title', options.title);
    const contentNode = this.createNodeWithContent('atlas-alert-content', options.content);

    return [
      [titleNode],    // First ng-content slot for title
      [contentNode]   // Second ng-content slot for content
    ];
  }

  /**
   * Destroys the currently active snackbar component, if any.
   */
  destroyAlertSnackbar(): void {
    if (this.snackbarComponentRef) {
      this.appRef.detachView(this.snackbarComponentRef.hostView);
      this.snackbarComponentRef.destroy();
      this.snackbarComponentRef = null;
    }
  }

  /**
   * Assigns properties to the target component instance if the value is not null or undefined.
   * @param instance - The AlertComponent instance.
   * @param options - The AlertConfig object containing the values.
   */
  private assignProperties(instance: AlertComponent, options: AlertConfig): void {
    const propsToAssign = {
      alertIcon: options?.alertIcon,
      variant: options?.variant,
      elevation: options?.elevation,
      actionLabel: options?.actionLabel,
      actionClick: options?.actionClick,
      closeClick: options?.closeClick,
      alertActionPadding: options?.alertActionPadding,
      action: options?.action,
      iconSize: options?.iconSize,
      typographyTitle: options?.typographyTitle,
      typographyContent: options?.typographyContent,
      iconClose: options?.iconClose,
      width: options?.width,
      dismissible: options?.dismissible,
      horizontalPosition: options?.horizontalPosition,
      verticalPosition: options?.verticalPosition,
    };

    // Only assign properties that are not null or undefined
    Object.entries(propsToAssign).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        (instance as any)[key] = value;
      }
    });
  }

  /**
   * Utility function to create an HTML element with content.
   * @param tagName - The tag name of the element.
   * @param content - The inner content to set.
   * @returns The created HTML element with the content.
   */
  private createNodeWithContent(tagName: string, content: string | undefined): HTMLElement {
    const element = document.createElement(tagName);
    element.innerHTML = content || '';
    return element;
  }
}
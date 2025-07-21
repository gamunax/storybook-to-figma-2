import { Injector } from '@angular/core';

export class AlertInjector implements Injector {
  constructor(
    private parentInjector: Injector,
    private additionalTokens: WeakMap<any, any>
  ) {}

  get(token: any, notFoundValue?: any) {
    const value = this.additionalTokens.get(token);
    if (value) {
      return value;
    }
    return this.parentInjector.get(token, notFoundValue);
  }
}
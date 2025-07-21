import { TestBed } from '@angular/core/testing';

import { ThemingService } from './theming.service';

describe('ThemingService', () => {
  let service: ThemingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemingService,
      ],
    });
    service = TestBed.inject(ThemingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  // it('should transform a reference to a var', () => {
  //   // if there is no reference in the string, nothing is replaced
  //   const reference1 = 'example-1.without-ref';
  //   const varOutput1 = service.transformReferenceToVar(reference1);
  //   expect(varOutput1).toEqual(reference1);

  //   const reference2 = 'rgba($colors.light.something, 0.5)';
  //   const varOutput2 = service.transformReferenceToVar(reference2);
  //   expect(varOutput2).toEqual('rgba(var(--semanticColor-light-something), 0.5)');

  //   const reference3 = '$colors.light.something';
  //   const varOutput3 = service.transformReferenceToVar(reference3);
  //   expect(varOutput3).toEqual('var(--semanticColor-light-something)');

  //   const reference4 = '$colors.light.something, and something else $size.xl test';
  //   const varOutput4 = service.transformReferenceToVar(reference4);
  //   expect(varOutput4).toEqual('var(--semanticColor-light-something), and something else var(--size-xl) test');
  // });

  // it('should flatten a configuration object', () => {
  //   const object1 = {}
  //   const flatObject1 = service.getTokens({});
  //   expect(object1).toEqual(flatObject1);

  //   const object2 = {
  //     test: '#ccc' 
  //   }
  //   const flatObject2 = service.getTokens(
  //     {
  //       '--test': '#ccc',
  //     },
  //   );
  //   expect(object2).toEqual(jasmine.objectContaining(flatObject2));
  
  //   const object3 = {
  //     test: {
  //       sub: 'rgba($colors.light.something), 0.5)',
  //       other: 'red',
  //     },
  //     test2: {
  //       blue: 'blue',
  //       other: {
  //         test: 'xl'
  //       }
  //     }
  //   }
  //   const flatObject3 = service.getTokens(
  //     {
  //       '--test-sub': 'rgba(var(--semanticColor-light-something)), 0.5)',
  //       '--test-other': 'red',
  //       '--test2-blue': 'blue',
  //       '--test2-other-test': 'xl',
  //     },
  //   );
  //   expect(object3).toEqual(jasmine.objectContaining(flatObject3));
  // });

  // it('should call the tokens method when applying a config', () => {
  //   let spy = spyOn(service, 'applyTokens');
  //   const o = {
  //     test: {
  //       sub: {
  //         value: 'rgba($colors.light.something), 0.5)',
  //       },
  //       other: {
  //         value: 'red',
  //       }
  //     },
  //     test2: {
  //       blue: {
  //         value: 'blue',
  //       },
  //       other: {
  //         test: {
  //           value: 'xl',
  //         },
  //         number: {
  //           value: 1234
  //         },
  //       }
  //     }
  //   };
  //   const exampleElement = document.createElement('div');
  //   service.applyConfig(o, exampleElement);
  //   expect(spy).toHaveBeenCalledOnceWith(
  //     jasmine.objectContaining(
  //       {
  //       '--test-sub': 'rgba(var(--semanticColor-light-something)), 0.5)',
  //       '--test-other': 'red',
  //       '--test2-blue': 'blue',
  //       '--test2-other-test': 'xl',
  //       '--test2-other-number': 1234,
  //       },
  //     ),
  //     exampleElement,
  //   );

  // });

  // it('should apply the tokens', () => {
  //   let spy = spyOn(document.documentElement.style, 'setProperty');
  //   let tokens = {
  //     '--test-sub': 'rgba(var(--semanticColor-light-something)), 0.5)',
  //     '--test-other': 'red',
  //     '--test2-blue': 'blue',
  //     '--test2-other-test': 'xl',
  //   };
  //   service.applyTokens(tokens);
  //   expect(spy).toHaveBeenCalledTimes(4);
  //   expect(spy).toHaveBeenCalledWith('--test-sub', 'rgba(var(--semanticColor-light-something)), 0.5)');
  //   expect(spy).toHaveBeenCalledWith('--test-other', 'red');
  //   expect(spy).toHaveBeenCalledWith('--test2-blue', 'blue');
  //   expect(spy).toHaveBeenCalledWith('--test2-other-test', 'xl');
  // });

  // it('should not apply an empty config', () => {
  //   let spy = spyOn(document.documentElement.style, 'setProperty');
  //   service.applyConfig({});
  //   expect(spy).not.toHaveBeenCalled();
  // });

});

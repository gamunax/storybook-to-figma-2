# MMC Atlas UI Components ![https://semver.org/spec/v2.0.0.html](https://img.shields.io/badge/semver-2.0.0-blue) 


<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white">


#### Mission

This project is dedicated to creating brand compliant UI using best practices for software development and design systems. We strive to create a seamless hand off for design and development teams.

This repository contains all of the Atlas Component Angular source code and corresponding Storybook Documentation build. For the deployments, [see this repository](https://github.com/mmctech/mosui-v3-documentation).

## Getting started

Run `yarn` to install the dependencies.

## Who we are
#### Maintainers
- [@alvaro-giraldo_mmcgh](https://github.com/alvaro-giraldo_mmcgh)
- [@natalia-loduca_mmcgh](https://github.com/natalia-loduca_mmcgh)
- [@adam-lee_mmcgh](https://github.com/adam-lee_mmcgh)
####  Trusted Committers
- [@adam-lee_mmcgh](https://github.com/adam-lee_mmcgh)
- [@carlos-aiello_mmcgh](https://github.com/carlos-aiello_mmcgh)
- [@osvaldo-morgan_mmcgh](https://github.com/osvaldo-morgan_mmcgh)
- [@natalia-loduca_mmcgh](https://github.com/natalia-loduca_mmcgh)
- [@alvaro-giraldo_mmcgh](https://github.com/alvaro-giraldo_mmcgh)

## Get Help

Need help, have suggestions or have found a bug? 🐛

You can [open an issue](https://github.com/mmctech/proxima-atlas/issues/new), [start a discussion](https://github.com/mmctech/proxima-atlas/discussions) or contact a trusted committer.

Should you require further help, please contact [Francis Dolan](mailto:Francis.Dolan@mmc.com).

## Contributing
Should you wish to contribute, you can take a look at our [Open Issues](https://github.com/mmctech/proxima-atlas/issues). If you decide to fix an issue, it is advisable to check the comment thread to see if there's somebody already working on a fix. If no one is working on it, please leave a comment stating your intentions to fix the issue. This will ensure people don't accidentally duplicate your fix.

### Prerequisites

If contributing to this project we assume you have a familiarity with npm, Angular, Typescript, SCSS and Node.js.

To learn more about the other technologies used in this site template, see the following resources:

[Angular](https://www.angular.io) - the official Angular documentation

[Typescript](https://www.typescriptlang.org/) - the official Typescript documentation

## Local Development

Run `yarn build` to build the app and all projects. 

To build individual component projects, follow the pattern `yarn build:component:button`. 

To build the common CDK project, run `yarn build:core`. 

Run `yarn start` for running the dev server using storybook. It will open a dev server in `localhost:6006`.

You can also run the angular project (which contains some examples and demos), by running `yarn serve`. It will open a dev server in `localhost:4200`.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `yarn build-storybook` to build the storybook static content.

## Running unit tests

Run `ng test` or `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run the tests in a specific library running `yarn test button` or `yarn test cdk`.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build Web Components (Angular elements)

After building each component you wish to be exported as Web Component, declare them in `/projects/elements/src/app/app.module.ts` by importing the appropiate modules.
Then add them to the array passed to `registerElements()` inside `ngDoBootstrap` method call like `{tag: 'my-element', klass: MyAwesomeComponent}`

For example:

```typescript
import { ButtonModule, ButtonComponent } from 'atlas-button';
import { ExampleModule, ExampleComponent } from 'example-component';

@NgModule({
  declarations: [],
  imports: [... ButtonModule, ExampleModule],
})
export class AppModule {
  constructor(private injector: Injector) {}

  this.registerElements([
      {tag: 'hui-button', klass: ButtonComponent},
      {tag: 'hui-example-component', klass: ExampleComponent}
  ]);
  .
  .
  .
}  
```

Once all components are delcared en the elements module you should run `npm run build:elements` which will produce an `elements.js` file in `/dist/elements` folder and also copy it to `/examples/web-components`.

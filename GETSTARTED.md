# Quick Start

To start [contributing](https://dev-mosui-v3-documentation.int.np.dal-2.oss2.mrshmc.com/?path=/docs/contributors-contributing--docs) to or testing with the library, ensure you have access to MMC Tech Github and clone the [repository](https://github.com/mmctech/proxima-atlas).

### Developers:

```bash
  git clone git@github.com:mmctech/proxima-atlas.git
```

In the root of the project, you can run `yarn serve` to run a test Angular playground project that will allow you to test the components in a live environment.

```bash
  yarn serve
```

To run the Storybook docs locally, you can run the following command:
  
  ```bash
    yarn start
  ```


### Designers:
Atlas's Figma artifacts are available to download below.

  <a className="link-item" target="_blank" download href="./atlas_design_system.zip">
    <span>
      <strong>Download the zipped version of the Atlas Library</strong>
    </span>
  </a>

  <a className="link-item" target="_blank" href="https://www.figma.com/design/i6nDIk4IO1veC5rt2d2z2r/Atlas-DS---Prod?m=auto&t=s0NIS5ey7vUeN2Ur-6">
    <span>
      <strong>Open Atlas Design System in Figma</strong>
    </span>
  </a>
  
Note: To ensure all references and icons display correctly in Figma, you should link both the main design file and the icon files as libraries in your Figma workspace. This will allow all components and icon references to resolve properly.
  

# Project Setup


Once you've setup a new Angular application (we suggest using Angular CLI), you can now install directly from the [Mercer JFrog registry](https://mgti-dal-so-art.mrshmc.com/ui/packages/npm:%2F%2Fatlas-cdk?name=atlas&type=packages).

### For local development

You can install packages directly from Github Packages for local development. You should start with the Component Development Kit [CDK] package.

```bash
  npm install atlas-cdk@npm:@mmctech/atlas-cdk@^9.0.0 --save
```

### For staging and production

Here is a sample `.npmrc` file that you can use to authenticate with the MMC JFrog registry.

```bash
  //.npmrc
  atlas-*:registry=<url register A>
  registry=https://mgti-dal-so-art.mrshmc.com/ui/api/npm/
```

Once you've saved `.npmrc` to the root of your project, the packages in your `package.json` will look the same, but use the MMC JFrog registry.

```bash
  "atlas-cdk": "^9.0.0"
```

### Install dependencies

> ❗️ Dependencies
>
> Please note the following dependencies:
>
> Types are modeled for Typescript v4.3.0 +. <a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html" target="_blank">More info</a>
> 
> The `atlas-field` package is dependent on `luxon`. <a href="https://dev-mosui-v3-documentation.int.np.dal-2.oss2.mrshmc.com/?path=/docs/adopters-components-field-readme--docs">More info</a>


```bash
  npm install luxon --save
```


## Sample Angular Module

```typescript
import { Button } from 'atlas-button';
// The rest of my imports

const ATLAS_COMPONENTS = [
  CdkModule,
  AppBarModule, 
  IconModule,
  ButtonModule,
  TableModule, 
  ChipsModule, 
  AvatarModule, 
  MenuModule, 
  ListModule, 
  DrawerModule, 
  TabsModule,
  FieldModule, 
  CheckboxModule, 
  RadioModule, 
  CardModule, 
  DialogModule, 
  AlertModule,
  LinkModule, 
];

@NgModule({
  imports: [
    ...ATLAS_COMPONENTS,
  ],
  exports: [...ATLAS_COMPONENTS],
})
```


## Styles and Theme Setup

Now that your component packages are setup and you have your `node_modules` installed, you can now setup your theme.
In Atlas, theming is a driving force of style sets for your application. Themes are the bridge between design and development. In the `CdkModule`, we have a `ThemeService` that you can learn more about here.

To instantiate our ThemingService, you can use the following strategy in your application:

```typescript
import { ThemingService } from 'atlas-cdk';
 constructor(
    private _themingService: ThemingService,
  ) {
this._themingService.applyConfigTheming();
}
```
If you need to apply a different theme specifically for edge cases, please contact Atlas Support. Use the following configuration as a reference:

```typescript
import { ThemingService } from 'atlas-cdk';
constructor(private themingService: ThemingService) {
    this.themingService.initializeTheme(yourEspecialConfig); // the file must follow the defaultConfig structure
    this.themingService.loadPrimitives();
    this.themingService.loadPalette();
    this.themingService.applyTheme();
}
```

Add this configuration into `styles.scss`:

```css
@import 'atlas-cdk/scss/cdk/fonts';
@import 'atlas-cdk/scss/cdk/mixins';
@import 'atlas-cdk/scss/cdk/grid';
@import 'atlas-cdk/scss/cdk/reset';
@import 'atlas-cdk/scss/cdk/utils';
// This is required for components like Dialog, Select, Menu, etc.
@import '@angular/cdk/overlay-prebuilt.css'; 

@include generate-grid();
@include html-reset;
```


## Using Assets from the CDK

System level assets are available for use in the project and are stored in the CDK. In this directory, you will find all of the basic svg, logos, docs and images that can be used by components. Before consuming the assets, it is necessary to set up the path into the project's main build. 

Add this configuration into `angular.json`:

```json
  "assets": [
    {
      "glob":"**/*",
      "input": " ./node_modules/atlas-cdk/assets/logos",
      "output": "atlas-logos"
    },
    {
      "glob":"**/*",
      "input": " ./node_modules/atlas-cdk/assets/icons",
      "output": "atlas-icons"
    },
    {
      "glob":"**/*",
      "input": " ./node_modules/atlas-cdk/assets/docs",
      "output": "atlas-docs"
    },
    {
      "glob":"**/*",
      "input": " ./node_modules/atlas-cdk/assets/images",
      "output": "atlas-images"
    }
  ]
```
## Additional Developer Resources

We provide a comprehensive Compodoc site where developers can explore and gain a deeper understanding of Atlas, including detailed documentation of its Angular components and their capabilities.

<a className="link-item" target="_blank" href="https://automatic-waddle-8qjro6e.pages.github.io/">
    <span>
      <strong>Explore the Compodoc Site</strong>
    </span>
</a>
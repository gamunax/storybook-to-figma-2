# Migrating

We're excited to announce the release of the Atlas Component Library and Design System. With this, we're retiring our old MercerOS UI packages and making the move to a more robust and streamlined development experience. Here are some critical points to take into account during your migration to Atlas. Please see our deprecated package guide below for more information.

## Overview

1. **Understanding the Design System:** Before starting the migration, familiarize yourself with the Atlas Component Library and Design System. This understanding will greatly facilitate the migration process.
2. **Component Equivalents:** Most components in the old UI packages have equivalents in the Atlas Design System. Refer to the [Atlas Component Equivalency Guide](#) for specifics.
3. **Atlas CDK:** The Atlas Component Library is supported by a primary required package: Atlas Component Development Kit (CDK). The Core CDK includes all fundamental, platform-agnostic type systems themes and design assets. 
4. **Atlas Components:** The component library consists of Angular-based components that are decoupled into their own packages.

## Step-by-step Guide

#### Step 1: Install Atlas Packages

Start by installing the Atlas UI packages. The primary required one is the CDK:

```bash
npm install atlas-cdk
npm install atlas-forms
```

Once this is installed, you can begin installing each component you want to use in your project. Please [see the availability page](?path=/docs/releases-availability--docs) for more information on all of our component packages.

#### Step 2: Update Component Imports

Next, you'll need to replace the imports in your project from the old UI package to the new Atlas packages.

```diff
- import { BrighterModule } from 'merceros-ui-components/experimental-brighter';
+ import { Button } from 'atlas-button';
```

We suggest using a shared module in your application that contains only the components you need. This helps keep your bundle nice and light and only imports the components your Angular application needs. Here's an example of my shared module's imports:

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

---

#### Step 3: Refactor Components

Review your UI components and replace any instances of the old UI components with their Atlas equivalents. Some components will have name changes, others will have changes in their props.

For instance, in the old UI package, the `Button` component may have been used as follows:

```html
<brighter-button color="primary">
    Submit
</brighter-button>
```

In the Atlas Design System, the equivalent usage would be:

```html
<atlas-button action="primary">
    Submit
</atlas-button>
```

#### Step 4: Update styles.scss

Atlas uses a new system for styling components with a new and improved theming capability that emits CSS variables on the DOM that is initially are sourced from JSON that was generated from Figma. 

In our latest design system these are called tokens. See our docs for more info on [color tokens](?path=/docs/adopters-design-tokens-colors--docs), [type tokens](?path=/docs/adopters-design-tokens-typography-page) and [util tokens](?path=/docs/adopters-design-cdk-utils-page).
***In Brighter, it looked like:***

```css
/* this file will be extracted to main dist folder and is imported in index.html */
@import "merceros-ui-core/scss/merceros-ui-core";
$mos-form-v2: true;
@import 'merceros-ui-components/scss/brighter-experimental';
// @include legacy-styles-using-wrapper();

// Global Typography Styles
@include html-reset();
@include brighter-typography($generateClasses: false);
@include generate-grid();
@include generate-spacer-classes();

```

***In MercerOS "V3" it looked like:***

```css
@import '~@mmctech/ngpd-merceros-ui-v3-cdk/scss/@mmctech/ngpd-merceros-ui-v3-cdk/fonts';
@import '~@mmctech/ngpd-merceros-ui-v3-cdk/scss/@mmctech/ngpd-merceros-ui-v3-cdk/mixins';
@import '~@mmctech/ngpd-merceros-ui-v3-cdk/scss/@mmctech/ngpd-merceros-ui-v3-cdk/grid';
@import '~@mmctech/ngpd-merceros-ui-v3-cdk/scss/@mmctech/ngpd-merceros-ui-v3-cdk/reset';

@include generate-grid();
@include html-reset;
```


***And in Atlas, it should now look like:***

```css
@import 'atlas-cdk/scss/cdk/fonts';
@import 'atlas-cdk/scss/cdk/mixins';
@import 'atlas-cdk/scss/cdk/grid';
@import 'atlas-cdk/scss/cdk/reset';
@import 'atlas-cdk/scss/cdk/utils';

@import '@angular/cdk/overlay-prebuilt.css';

@include generate-grid();
@include html-reset;
```


#### Step 5: Test Functionality and UI

After updating the components and styling, thoroughly test your application. Ensure all UI components are functioning as expected and the UI matches the design guidelines outlined in the Atlas Design System.

#### Step 6: Remove Old UI Packages

Finally, once your application is stable and functions as expected with the Atlas Component Library, you can remove the old UI package from your dependencies.

***With npm:***
```bash
npm uninstall merceros-ui-components
npm uninstall merceros-ui-core
npm uninstall merceros-ui-assets
```
***With yarn:***
```bash
yarn remove merceros-ui-components
yarn remove merceros-ui-core
yarn remove merceros-ui-assets
```

## Documentation and Support

This documentation site is a great resource for getting familiar with the components and understanding their props and usage. If you encounter any issues or have questions during the migration process, please  [start a discussion on our Github Discussions](https://github.com/mmctech/proxima-atlas/discussions) so that the team can help!

Remember, this migration is not just a simple replacement, but a shift in how we approach design and development. The Atlas Design System brings consistency, speed, and efficiency, enhancing both the developer experience and the designer experience. We appreciate your support during this transition period and look forward to seeing the innovative solutions you create with the Atlas Component Library and Design System.




#### 🎗️ Angular Support Model

| UI Package | Design System |
| --- | --- |
| ngpd-merceros-ui-components-srcs | MOSUI v1, Brighter  |
| ngpd-merceros-ui-core |  MOSUI v1 |
| ngpd-merceros-ui-assets | MOSUI v1 |
| @mmctech/ngpd-merceros-ui-v3-COMPONENT** | MOSUI "v3" |

#### ➗ Component Equivalency Guide

| Old Name | Atlas Name |
| --- | --- |
| Autocomplete | Typeahead (found in [Field](?path=/docs/adopters-components-field-readme--docs))  |
| Control | Field  |
| Header | App-bar  |
| IconButton |  Button + Icon |
| ModalService |  Dialog |
| Toast |  Snackbar |

Please note, Field contains quite a bit of subcomponents like:

1. Text fields
2. Select, Option
3. Password Redaction
4. Error handling, display
5. Hint field
6. Label
7. Prefix, Suffix
8. Calendar
9. Datepicker
10. Date Range Picker
11. Timepicker
12. Typeahead
For more info, visit our [Field Readme](?path=/docs/adopters-components-field-readme--docs).


#### 🪦 Deprecated UI Packages

| UI Package | Design System |
| --- | --- |
| ngpd-merceros-ui-components-srcs | MOSUI v1, Brighter  |
| ngpd-merceros-ui-core |  MOSUI v1 |
| ngpd-merceros-ui-assets | MOSUI v1 |
| @mmctech/ngpd-merceros-ui-v3-COMPONENT** | MOSUI "v3" |
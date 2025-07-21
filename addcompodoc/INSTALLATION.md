
# How to install Atlas

> 🖥️ Below is the step-by-step Atlas installation process with 2 example projects which were used as pilot; please use this as your installation guide and only reach out to our team if you have come to a roadblock at `#atlas-halo-support`.

## 🚀 How to implement the Atlas UI Library

### Installation steps

1. **Add libraries from package.json**  
   Depending on the environment work, you should add packages from the mercer network or local:

   a. Add libraries from GitHub packages in package.json (for local environments)

   ```json
   "atlas-cdk": "npm:@mmctech/atlas-cdk@^8.0.0-beta",
   "atlas-button": "npm:@mmctech/atlas-button@^8.0.0-beta"
   ```

   or install the package in this way:

   ```bash
   npm install atlas-cdk@npm:@mmctech/atlas-cdk@7.0.0 --save
   ```

   Check the library from [GitHub Atlas CDK](https://github.com/mmctech/proxima-atlas/pkgs/npm/atlas-cdk)

   b. Add libraries from jfrog (mercer network) in package-ci.json

   ```json
   "atlas-cdk": "^8.0.0-beta",
   "atlas-checkbox": "^8.0.0-beta",
   "atlas-divider": "^8.0.0-beta",
   "atlas-icon": "^8.0.0-beta",
   ...
   ```

*Note*: take the last version available for:
- NG16: v6.x.x
- NG17: v7.x.x
- NG17 (new theming): v8.0.0-beta

2. **To use Assets from the CDK**, add this configuration into `angular.json`:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "./node_modules/atlas-cdk/assets/logos",
    "output": "atlas-logos"
  },
  {
    "glob": "**/*",
    "input": "./node_modules/atlas-cdk/assets/icons",
    "output": "atlas-icons"
  },
  {
    "glob": "**/*",
    "input": "./node_modules/atlas-cdk/assets/docs",
    "output": "atlas-docs"
  },
  {
    "glob": "**/*",
    "input": "./node_modules/atlas-cdk/assets/images",
    "output": "atlas-images"
  }
]
```

3. **Add references from `styles.scss` to add the default styles**:

```scss
@import 'atlas-cdk/scss/cdk/fonts';
@import 'atlas-cdk/scss/cdk/mixins';
@import 'atlas-cdk/scss/cdk/grid';
@import 'atlas-cdk/scss/cdk/reset';
@import 'atlas-cdk/scss/cdk/utils'; // new-theming

@import '@angular/cdk/overlay-prebuilt.css';

@include generate-grid();
@include html-reset();
```

4. **Add theming to instantiate the ThemingService.** Modify `app.component.ts` to add the theming:

```typescript
import { ThemingService, defaultConfig } from 'atlas-cdk';
constructor(private themingService: ThemingService) {
    this.themingService.initializeTheme(defaultConfig);
    this.themingService.loadPrimitives();
    this.themingService.loadPalette();
    this.themingService.applyTheme();
}
```

5. **Install dependencies.** The `atlas-field` package is dependent on `luxon`. Install:

```bash
npm install luxon --save
```

6. **Add libraries from `component.module.ts`**:

```typescript
import { CdkModule } from 'atlas-cdk';
import { ButtonModule } from 'atlas-button';
import { IconModule } from 'atlas-icon';
const MODULES = [
  CdkModule,
  IconModule,
  ...
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES,
  ],
  exports: [...COMPONENTS, ...MODULES],
  providers: [RemoveSpacePipe],
})
export class ComponentsModule {}
```

7. **Add implementation from a component**:

- `x.component.ts`:

```typescript
import { Actions } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
readonly actions = Actions;
readonly iconSizes = IconSizes;
```

- `x.component.html`:

```html
<atlas-button
  [disabled]="
    !form.valid || 
    !dataflow?.dataSet?.name || 
    (!endDateDisabled && !dataflow?.endAt)
  "
  [action]="actions.primary"
  (onClick)="goToReview()"
  data-test-id="newDataflowNext"
>
  <atlas-icon 
    icon="icon-chevron-right-24"
    [size]="iconSizes.small"
  ></atlas-icon>
  Next
</atlas-button>
```

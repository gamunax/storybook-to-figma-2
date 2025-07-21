# Contributing

Should you wish to contribute, you can take a look at our [Open Issues](https://github.com/mmctech/proxima-atlas/issues). If you decide to fix an issue, it is advisable to check the comment thread to see if there's somebody already working on a fix. If no one is working on it, please leave a comment stating your intentions to fix the issue. This will ensure people don't accidentally duplicate your fix.

If you are planning to contribute a NEW item, the governance team will first need to approve your new feature to ensure it fits in our planned architecture and design pattern.

We expect as the lead contributor you will provide the following in your delivery:

1. Any necessary UX justification, documentation or update that is supplemental to your update
2. Documentation explaining what and how to use your code or design element
3. A PR set with our primary maintainers as reviewers in this repository
    Note: if it's design only contribution, please contact [Francis Dolan](mailto:Francis.Dolan@mmc.com) for more information.



## Developing a component

When developing a component separate the visual configuration from the behavior configuration.

### Add Angular Build Target

Add your build target to `angular.json`.

```json
"checkbox": {
      "projectType": "library",
      "root": "projects/checkbox",
      "sourceRoot": "projects/checkbox/src",
      "prefix": "atlas",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr",
          "options": {
            "project": "projects/checkbox/ng-package.json"
          },
          "configurations": {
            "production": {
              "tsConfig": "projects/checkbox/tsconfig.lib.prod.json"
            },
            "development": {
              "tsConfig": "projects/checkbox/tsconfig.lib.json"
            }
          },
          "defaultConfiguration": "production"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "projects/checkbox/src/test.ts",
            "tsConfig": "projects/checkbox/tsconfig.spec.json",
            "karmaConfig": "projects/checkbox/karma.conf.js"
          }
        }
      }
    },
```

### Add Build Script

Add your build script to `package.json`.

```json
    "build:component:checkbox": "ng build checkbox",
```

### Create Visual configuration

e.g. colors, sizes, typographies.

The component visual design configuration uses styles from our design tokens as it's base so that our theming can be updated throughout configurations and even base styles can be reconfigured at runtime on the application side.

#### Component class generation example in YOUR-COMPONENT.theming.ts

```ts
export const config = {
    checkbox: {
        primary: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$colors.action.default.main-contained',
            },
            states: {
                checked: {
                    type: 'state',
                    description: 'checked state for default checkbox',
                    "value": {
                        color: '$colors.action.primary.main-contained',
                    }
                },
                hover: {
                    type: 'state',
                    description: 'hover state for primary checkbox',
                    "value": {
                        color: '$colors.action.primary.contained-hover-background',
                    }
                },
            }
        },
    }
}
```

#### Import and apply your config service in the component constructor

```ts
  constructor(
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
  }
```


The `ThemeService` will then render the following CSS classes, psuedo styles and properties that you can use within your component template:

```css
.checkbox-primary {
    color: var(--semanticColor-background-neutral-strong-rest);
}
.checkbox-primary:checked {
    color: var(--semanticColor-background-brand-strong-rest);
}
.checkbox-primary:hover {
    color: var(--semanticColor-background-brand-strong-hover);
}
```

### Behavior configuration

e.g. disabled state.

Te behavior configurations should be added by using inputs (`@Input`).

```ts
@Input() disabled: boolean = false;
```

### Composition vs configuration

When developing a component, always prefer composition over configuration.

```html
<atlas-button>
    This is prefered
</atlas-button>
```
Is prefered instead of:

```html
<atlas-button [text]="'avoid this'">
</atlas-button>
```


### Component vs Pattern

When deciding how to componentize and implement a visual design, we prefer to provide composable blocks that allow flexibility in use case output. 

In the first example below, we see a an icon placed inside of a button with no dependencies created. In the second, we see a button that has inputs that are dedicated to displaying an icon inside of it's template. The latter creates a dependency on IconComponent inside of ButtonComponent and does not allow us to scale IconComponent without creating additional functionality in the ButtonComponent to reflect it.

#### Pattern build with two base components:

```html
<atlas-button>
    <atlas-icon icon="arrow"></atlas-icon>
    This is prefered
</atlas-button>
```
Is prefered instead of:

```html
<atlas-button icon="arrow" iconPosition="left" iconSize="...">
    Too many dependencies
</atlas-button>
```

### Services Preferred

A core feature of our component package architecture is that the components can be used outside of Angular as standard Web Components. This allows us to utilize the component styles and interactions with other frameworks like React. This key feature drives our decision path on building out extendable services over directives in our CDK.

`Tips`

**DO:** Use utility classes, components and services to provide reusable styles or functionality across components and products.

**DON'T:** Use directives to extend functionality across components or products.

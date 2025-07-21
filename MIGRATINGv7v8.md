# Migration Guide Index ATLAS v7 to v8, v9

- [Migrating from ATLAS v7 to v8, v9](#migrating-from-atlas-v7-to-v8)
  - [Pre-Migration Recommendation](#-pre-migration-recommendation)
  - [Step 1: Install the Migration Library](#-step-1-install-the-migration-library)
  - [Step 2: Execute the Migration Script](#-step-2-execute-the-migration-script)
  - [Step 3: Update Your Dependencies](#-step-3-update-your-dependencies)
  - [Step 4: Install Dependencies](#-step-4-install-dependencies)
  - [Step 5: Run Your Application](#-step-5-run-your-application)
  - [Final Checks](#-final-checks)
  - [Post Migration](#-post-migration)
  - [Need Help?](#-need-help)
  
---

# Migrating from ATLAS v7 to v8, v9

We're excited to announce the release of **Atlas Component Library and Design System version 8**! Below are the key steps to guide you through the migration from Atlas v7 to v8.

## Step-by-Step Migration Guide

### **📌 Pre-Migration Recommendation**

Before starting, we recommend deleting the `node_modules` and `dist` folders to ensure a smooth and optimized migration process.

```sh
rm -rf node_modules dist

```

### 🚀 Step 1: Install the Migration Library

#### Option 1: Install the package from GitHub Packages

1. To install the library from **GitHub Packages**, ensure your registry is configured as follows:

```bash
@mmctech:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR-GITHUB-TOKEN
registry=https://registry.npmjs.org/
```

Replace YOUR-GITHUB-TOKEN with your personal access token. You can generate a token by following the instructions in the [GitHub documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-the-registry).

> 💡 **NOTE:** You can configure this globally or specifically for your project by creating a `.npmrc` file and adding the lines mentioned above.

2. Go to the root directory of your frontend project repository that you wish to migrate to Atlas, and execute the following command:

```bash
npm install lib-atlas-migration@npm:@mmctech/lib-atlas-migration --save-dev
```

or if you encounter compatibility issues, add the `--legacy-peer-deps` flag

```bash
npm install lib-atlas-migration@npm:@mmctech/lib-atlas-migration --save-dev --legacy-peer-deps
```

#### Option 2: Install the package manually

 1. Download the package from the following link:
  <a target="_blank" download href="./lib-atlas-migration.tgz">
      <strong>lib-atlas-migration.tgz</strong>
  </a>

2. Place the `lib-atlas-migration.tgz` file in the root directory of your project.

3. Modify the `package.json` file of your project to include the following:

```json
"devDependencies": {
  "lib-atlas-migration": "file:lib-atlas-migration.tgz"
}
```

> ⚠️ **IMPORTANT**: Ensure that the `lib-atlas-migration.tgz` file is located in the root directory of your project. If you place it in a different location, update the path accordingly in the `package.json` file.

4. Install the package by running the following command:

```bash
npm install
```

or if you encounter compatibility issues, add the `--legacy-peer-deps` flag to the command.

```bash
npm install --legacy-peer-deps
```

### ⚙️ Step 2: Execute the Migration Script

Run the migration script to apply necessary changes:

```sh
ng g lib-atlas-migration:v7tov8
```

### 📦 Step 3: Update Your Dependencies

You need to update all Atlas libraries to VERSION ^8.0.2 or ^9.0.0 in your `package.json` file.

### For local development

    "atlas-cdk": "npm:@mmctech/atlas-cdk@^VERSION",
    "atlas-accordion": "npm:@mmctech/atlas-accordion@^VERSION",
    "atlas-alert": "npm:@mmctech/atlas-alert@^VERSION",
    "atlas-app-bar": "npm:@mmctech/atlas-app-bar@^VERSION",
    "atlas-avatar": "npm:@mmctech/atlas-avatar@^VERSION",
    "atlas-badge": "npm:@mmctech/atlas-badge@^VERSION",
    "atlas-button": "npm:@mmctech/atlas-button@^VERSION",
    "atlas-card": "npm:@mmctech/atlas-card@^VERSION",
    "atlas-checkbox": "npm:@mmctech/atlas-checkbox@^VERSION",
    "atlas-chips": "npm:@mmctech/atlas-chips@^VERSION",
    "atlas-divider": "npm:@mmctech/atlas-divider@^VERSION",
    "atlas-drawer": "npm:@mmctech/atlas-drawer@^VERSION",
    "atlas-field": "npm:@mmctech/atlas-field@^VERSION",
    "atlas-icon": "npm:@mmctech/atlas-icon@^VERSION",
    "atlas-link": "npm:@mmctech/atlas-link@^VERSION",
    "atlas-list": "npm:@mmctech/atlas-list@^VERSION",
    "atlas-menu": "npm:@mmctech/atlas-menu@^VERSION",
    "atlas-pagination": "npm:@mmctech/atlas-pagination@^VERSION",
    "atlas-progress": "npm:@mmctech/atlas-progress@^VERSION",
    "atlas-switch": "npm:@mmctech/atlas-switch@^VERSION",
    "atlas-table": "npm:@mmctech/atlas-table@^VERSION",
    "atlas-tabs": "npm:@mmctech/atlas-tabs@^VERSION",
    "atlas-tooltip": "npm:@mmctech/atlas-tooltip@^VERSION"
    ...

### For the dev - stg - prod environment use

    "atlas-cdk": "^VERSION",
    "atlas-accordion": "^VERSION",
    "atlas-alert": "^VERSION",
    "atlas-app-bar": "^VERSION",
    "atlas-avatar": "^VERSION",
    "atlas-badge": "^VERSION",
    "atlas-button": "^VERSION",
    "atlas-card": "^VERSION",
    "atlas-checkbox": "^VERSION",
    "atlas-chips": "^VERSION",
    "atlas-divider": "^VERSION",
    "atlas-drawer": "^VERSION",
    "atlas-field": "^VERSION",
    "atlas-icon": "^VERSION",
    "atlas-link": "^VERSION",
    "atlas-list": "^VERSION",
    "atlas-menu": "^VERSION",
    "atlas-pagination": "^VERSION",
    "atlas-progress": "^VERSION",
    "atlas-switch": "^VERSION",
    "atlas-tabs": "^VERSION",
    "atlas-table": "^VERSION",
    "atlas-tooltip": "^VERSION",
    ...

### 📥 Step 4: Install Dependencies

```sh
npm install

```

### 🚀 Step 5: Run Your Application

Start your application to verify that everything compiles correctly.

### ✅ Final Checks

- Verify that your UI and all functionalities are working as intended.

## 🛠️ Post Migration
- Refer to the documentation for guidance on using tokens, and prioritize `semanticColor` over primitive values to improve maintainability. Please check the [🔗 Colors](http://localhost:6006/?path=/docs/adopters-design-colors--docs) and also the new [🔗 Typography](http://localhost:6006/?path=/docs/adopters-design-typography--docs) section for more information. 
- If you need to apply a custom theme for specific edge cases, consult the [🔗 Setup](http://localhost:6006/?path=/docs/get-started-setup--docs) documentation.
- When using enum classes from components such as buttons or chips, always import them from the `atlas-cdk` package to ensure type safety and maintainability:

```sh
import { Actions, BoxShadows, ThemingService, Radii, ButtonVariants, Styles, Colors } from 'atlas-cdk';
```
- Using `action` instead of `color`, or `variant` instead of `style`, is supported for backward compatibility. However, for future development, it is recommended to use `color` and `style` for better readability and maintainability.
- Note that in v9, default values have changed for some components (e.g., buttons, chips). Review your code and update it to use the appropriate `color` or `style` values as needed.

### 💡 Need Help?

If you encounter any issues during the migration, feel free to reach out via GitHub issues or atlas support channel:

[🔗 GitHub Issues](https://github.com/mmctech/proxima-atlas/issues)

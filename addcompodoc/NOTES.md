# Major Theming Update (v8.0.0-beta)

>**Major Theming Update:**  
> This BETA version features a refresh of our theme tokens to use Figma Variables!  
> Since this is a breaking change, upgrading to this BETA will require modifications to your project to adapt to the new theming system.

## Token Migration Script

> In anticipation of this token refresh, we have prepared a Token Migration script that can recursively replace token names throughout your entire project’s codebase when upgrading to v8-beta.  
> [Find the repository and details here](https://github.com/mmctech/atlas-token-migration).

## Recommended for New Projects

> Due to the potential impact on existing projects, we recommend using this BETA release only for new projects or if you are prepared to implement the necessary changes.  
> Bug fixes through Q4 will continue to be applied to both v7.0.0 and v8.0.0-beta.

## Stabilizing the BETA

> As we stabilize this BETA, patches will ensure fully functional theming throughout the system.  
> Please report any issues so we can address them promptly.  
> We are targeting the end of Q4 to release Atlas v8 to production!

## Feature Development in this Version

- **New theme model** is implemented and tested across all components in the library.
- **Revamped component API docs** built with Compodoc showcasing our API docs.  
  _(Note: Storybook is limited to only high-order components.)_
- **New playground** showcasing all of our components against mock data.
- > [playground](https://didactic-doodle-4kjv44e.pages.github.io/new-playground).
- > [playground code](https://github.com/mmctech/atlas-playground).

## Bug Fixes

- **Field Component Fix:**  
  Directive updated from `haloInput` to `atlasInput`.

## Component Access

- Atlas components are available on JFrog and also accessible on GitHub packages for local development.

### Links
- [JFrog](https://mgti-dal-so-art.mrshmc.com/ui/packages?name=atlas-&type=packages)
- Tag: `v8.0.0-beta`[GitHub](https://github.com/mmctech/proxima-atlas/releases/tag/v8.0.0-beta)

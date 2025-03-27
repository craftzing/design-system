# DesignSystem

This repository contains an example setup for a web components-based design system.

## Getting started

1. Clone this repository.

```
git clone git@github.com:craftzing/design-system.git
cd design-system
```

2. Install dependencies

```
npm install
```

## Usage

### Storybook

Storybook provides an isolated environment to develop and test UI components in a design system. It allows for interactive documentation and testing of components.

Storybook is set up in a separate lib and will render a collection of all components in the monorepo.

Start storybook development environment.

```
npm run storybook
```

Build your storybook instance.

```
npm run build-storybook
```

### NX

[NX](https://nx.dev/) is a powerful monorepo tool that helps developers manage multiple projects efficiently. It provides a structured, scalable, and optimized workflow for developing and maintaining a design system.

Run the following command to create a new lib.

```
npx nx g @nx/js:lib libs/mylib
```

### Lit

This library uses [Lit](https://lit.dev/) to build components.

[Lit](https://lit.dev/) is a simple yet powerful library for building fast, lightweight, and reusable web components. It builds upon the Web Components standard and offers an efficient rendering system with minimal boilerplate code.

See [button](./packages/button/src/lib/button.component.ts) component for a complete example.

## Tokens

### Tools

[Tokens studio](https://tokens.studio) is a design tokens management platform that integrates with Figma and Github. It acts as the source of truth for both designers and developers and provides tools to share the tokens.

[Style dictionary](https://styledictionary.com) is used to transform the source tokens (from Tokens studio) to usable output. In this project, they are transformed to CSS variables.

### Generate tokens

Tokens studio syncs the tokens to Github into the following file.

```
libs/tokens/tokens-studio/tokens.json
```

Run the following command to build the design tokens. This will generate the platform specific styles and store them in the dist folder.

```
npm run build-tokens
```

The design tokens are now available through the workspace.

```
import cssTokens from @design-system/tokens/css/tokens.css
```

> **Note:** Currently the tokens are built through a custom script in the tokens lib. Once nx adds support for ESM in nx plugins, the build script can be adapted to a custom executor. Creating executors standardizes the scripts that are run during development, building and deployment tasks.

ESM support issue: https://github.com/nrwl/nx/issues/15682

An example executor for building the tokens can be found in the `tools/build-tokens` directory. With a custom executor, building the tokens might look like this:

```
nx run @design-system/tokens:build-tokens
```

### Testing your tokens

Run the tokens tests

```
nx run @design-system/tokens:test
```

Update the token snapshots

```
nx run @design-system/tokens:test -u
```

## Chromatic

[Chromatic](https://www.chromatic.com/) is a visual testing and review platform for UI components. It enables developers to catch visual regressions early by comparing UI snapshots over time.

Create a new build.

```
npm run chromatic
```

Review UI changes in the Chromatic [dashboard](https://www.chromatic.com/builds?appId=67d2f3a4c2b97f80915a2be2).

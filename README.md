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

## Chromatic

[Chromatic](https://www.chromatic.com/) is a visual testing and review platform for UI components. It enables developers to catch visual regressions early by comparing UI snapshots over time.

Create a new build.

```
npm run chromatic
```

Review UI changes in the Chromatic [dashboard](https://www.chromatic.com/builds?appId=67d2f3a4c2b97f80915a2be2).

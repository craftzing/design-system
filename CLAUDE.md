# CLAUDE.md - Craftzing Design System

## Project Overview

This is a **web components-based design system** built with **Lit** and managed as an **NX monorepo**. The system provides reusable UI components using modern web standards and is designed for enterprise-level applications.

**Key Technologies:**

- **Lit** - For building web components
- **NX** - Monorepo management and build orchestration
- **TypeScript** - Primary programming language
- **Storybook** - Component documentation and testing
- **Style Dictionary** - Design tokens transformation
- **Tokens Studio** - Design token management
- **Chromatic** - Visual testing and review

## Project Structure

```
design-system/
├── packages/                    # Published packages
│   ├── core/                   # Core utilities and base classes
│   ├── design-system/          # Main component library
│   └── tokens/                 # Design tokens package
├── libs/                       # Internal libraries
│   ├── storybook/              # Storybook configuration
│   └── tokens/                 # Token transformation utilities
├── dist/                       # Build output
├── tmp/                        # Temporary build files
└── node_modules/               # Dependencies
```

## Architecture

### Monorepo Structure

- **Type**: NX-powered monorepo with workspaces
- **Package Manager**: npm with workspaces
- **Build System**: SWC for fast TypeScript compilation
- **Bundler**: Rollup with TypeScript plugin
- **Testing**: Vitest for unit tests
- **Linting**: ESLint with NX plugin for module boundaries

### Component Architecture

- **Base Class**: `CraftzingElement` extends `LitElement`
- **Component Definition**: Auto-registration with dependency injection
- **Styling**: CSS-in-JS with Lit's `css` template literal
- **Props**: TypeScript interfaces with Lit decorators
- **Exports**: ESM with proper TypeScript declarations

## Our Stack for Component Development

When using the Figma MCP server or generating components from designs, use the following technology stack:

### Primary Technologies

- **Framework**: Lit (Web Components)
- **Language**: TypeScript
- **Styling**: CSS-in-JS with Lit's `css` template literal
- **Design Tokens**: CSS custom properties from `/packages/tokens/dist/css/tokens.css`

### Component Implementation Stack

- **Base Class**: Always extend `CraftzingElement` (imported from `craftzing-design-system-test-core`)
- **Property Decorators**: Use Lit's `@property()` decorator for reactive properties
- **Templates**: Use Lit's `html` template literal for rendering
- **Event Handling**: Use Lit's event binding syntax (`@event="${handler}"`)
- **Conditional Rendering**: Use Lit directives (`ifDefined`, `classMap`, etc.)

### Styling Guidelines

- **CSS Variables**: Always use design tokens from tokens.css (e.g., `var(--primary-500)`, `var(--space-m)`)
- **CSS Nesting**: Use native CSS nesting for component styles
- **BEM-like Classes**: Use component-specific class naming (e.g., `.button`, `.button--primary`)
- **Responsive Design**: Use token-based breakpoints and spacing
- **Accessibility**: Include proper ARIA attributes and focus states

### Utility Libraries

- **Class Management**: `classnames` for conditional CSS classes
- **Spread Attributes**: `@open-wc/lit-helpers` for spreading undeclared attributes
- **Conditional Values**: `lit/directives/if-defined` for optional attributes

### Code Generation Context

When generating code from Figma designs:

- Use semantic HTML elements where appropriate
- Implement proper TypeScript interfaces for component props
- Include comprehensive accessibility attributes
- Use design tokens for all visual properties (colors, spacing, typography)
- Follow the existing component patterns and file structure
- Build components highly composable
- Always use slots when the slot component is used in Figma
- Include proper exports and component registration

## Key Files and Entry Points

### Main Entry Points

- `/packages/design-system/src/index.ts` - Main component exports
- `/packages/core/src/index.ts` - Core utilities and base classes
- `/packages/tokens/dist/css/tokens.css` - Design tokens as CSS variables

### Configuration Files

- `/nx.json` - NX workspace configuration
- `/package.json` - Root package with workspace scripts
- `/tsconfig.base.json` - Base TypeScript configuration
- `/eslint.config.mjs` - ESLint configuration
- `/vitest.workspace.ts` - Vitest workspace configuration

### Storybook Configuration

- `/libs/storybook/.storybook/main.ts` - Storybook configuration
- `/libs/storybook/.storybook/preview.ts` - Global Storybook settings
- Stories Location: `packages/**/src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)`

## Scripts and Commands

### Development

```bash
npm run storybook              # Start Storybook development server
npm run storybook:build        # Build Storybook for production
```

### Design Tokens

```bash
npm run tokens:build           # Build tokens from Tokens Studio to CSS
npm run tokens:test            # Run token tests
npm run tokens:test:update     # Update token snapshots
```

### Build and Release

```bash
npm run clean                  # Clean dist directories
npm run version                # Version packages using semantic versioning
npm run chromatic              # Run visual regression testing
```

### NX Commands

```bash
nx run <project>:<target>      # Run specific project targets
nx build <project>             # Build specific project
nx test <project>              # Test specific project
nx lint <project>              # Lint specific project
```

## Component Development Patterns

### Component Structure

Each component follows this structure:

```
component-name/
├── component-name.component.ts  # Main component implementation
├── component-name.types.ts      # TypeScript interfaces
├── component-name.css           # External styles (optional)
├── component-name.stories.ts    # Storybook stories
├── component-name.test.ts       # Unit tests
├── component-name.ts            # Re-exports and registration
└── index.ts                     # Public API exports
```

### Base Component Class

All components extend `CraftzingElement` which provides:

- Automatic component registration
- Dependency injection system
- Helper for undeclared attributes
- Custom element definition utilities

### Example Component Implementation

```typescript
import { CraftzingElement } from 'craftzing-design-system-test-core';

class MyComponent extends CraftzingElement {
  @property({ reflect: true })
  variant: 'primary' | 'secondary' = 'primary';

  static styles = css`
    /* styles */
  `;

  render() {
    return html`<div class="my-component">Content</div>`;
  }
}
```

## Design Tokens Workflow

### Token Management

1. **Source**: Tokens Studio (Figma plugin) syncs to `/packages/tokens/tokens-studio/tokens.json`
2. **Transform**: Style Dictionary processes tokens to CSS variables
3. **Output**: Generated CSS files in `/packages/tokens/dist/css/`
4. **Usage**: Import tokens as CSS variables in components

### Token Categories

- **Colors**: Brand colors, semantic colors, neutral palette
- **Typography**: Font weights, sizes, line heights
- **Spacing**: Consistent spacing scale
- **Sizes**: Component dimensions and breakpoints

### Token Usage in Components

```typescript
static styles = css`
  .button {
    background-color: var(--primary-500);
    color: var(--typography-white);
    padding: var(--space-xs) var(--space-m);
    font-size: var(--size-m);
  }
`;
```

## Testing Strategy

### Unit Testing

- **Framework**: Vitest with jsdom
- **Location**: `*.test.ts` files alongside components
- **Coverage**: @vitest/coverage-v8 for coverage reports
- **Helpers**: @open-wc/testing for web component testing

### Visual Testing

- **Chromatic**: Automated visual regression testing
- **Storybook**: Component isolation and documentation
- **Stories**: Required for all components

### Token Testing

- **Snapshot Testing**: Ensures token output consistency
- **Location**: `/packages/tokens/tests/`
- **Update**: `npm run tokens:test:update`

## Development Workflow

### Adding New Components

1. Create component directory in `/packages/design-system/src/lib/`
2. Implement component class extending `CraftzingElement`
3. Add TypeScript interfaces
4. Create Storybook stories
5. Write unit tests
6. Export from main index.ts
7. Update documentation

### Storybook Story Guidelines

When creating stories for a component built with Lit, **always define the component at the top of the file** using the component's static `define()` method:

```typescript
import { CZButton } from './button.component.js';

CZButton.define('cz-button'); // Define component at the top

export default {
  title: 'Components/Button',
  component: 'cz-button',
  // ... rest of config
};
```

### Working with Tokens

1. Update tokens in Tokens Studio (Figma)
2. Sync changes to tokens.json
3. Run `npm run tokens:build`
4. Test token changes with `npm run tokens:test`
5. Update snapshots if needed

### Release Process

1. Development happens on feature branches
2. Use semantic versioning with `npm run version`
3. Visual review through Chromatic
4. Automated releases for packages/\* only

## Build and Deployment

### Build Targets

- **Components**: Compiled to ES modules with TypeScript declarations
- **Tokens**: CSS variables and utility files
- **Storybook**: Static site for component documentation

### Output Structure

```
dist/
├── packages/
│   ├── design-system/          # Component library build
│   ├── core/                   # Core utilities build
│   └── tokens/                 # Token files (CSS, JS, etc.)
└── storybook/                  # Storybook static files
```

## Key Dependencies

### Core Dependencies

- `lit` - Web components framework
- `@open-wc/lit-helpers` - Lit utilities
- `classnames` - CSS class management
- `style-dictionary` - Token transformation

### Development Dependencies

- `nx` - Monorepo management
- `@nx/js`, `@nx/storybook` - NX plugins
- `@swc/core` - Fast TypeScript compilation
- `vitest` - Testing framework
- `chromatic` - Visual testing

## TypeScript Configuration

### Key Settings

- **Target**: ES2015 for broad compatibility
- **Module**: ESNext with bundler resolution
- **Decorators**: Enabled for Lit decorators
- **Plugins**: ts-lit-plugin for Lit templates
- **Paths**: Workspace-relative imports

### Module Boundaries

ESLint enforces module boundaries:

- Packages can depend on other packages
- Components should use proper imports
- No circular dependencies

## Environment Setup

### Requirements

- Node.js (version specified in package.json)
- npm (with workspaces support)
- Modern browser for Storybook

### Getting Started

1. `git clone <repo>`
2. `npm install`
3. `npm run storybook` - Start development
4. `npm run tokens:build` - Build tokens

## Best Practices

### Component Development

- Always extend `CraftzingElement`
- Use TypeScript interfaces for props
- Include Storybook stories for all components
- Write unit tests for component logic
- Use design tokens for styling
- Follow semantic versioning

### Code Quality

- ESLint for code consistency
- Prettier for formatting
- TypeScript strict mode
- Comprehensive test coverage
- Visual regression testing

### Performance

- Tree-shakable exports
- Lazy loading for large components
- Efficient re-rendering with Lit
- Optimized build outputs

## Troubleshooting

### Common Issues

1. **Component not registering**: Check `define()` call in stories
2. **Token not found**: Ensure tokens are built and imported
3. **Build errors**: Check TypeScript configuration and imports
4. **Storybook not loading**: Verify story files match pattern

### Debug Commands

```bash
nx run design-system:build --verbose    # Verbose build output
nx run tokens:test --watch             # Watch token tests
nx run storybook:storybook --verbose   # Debug Storybook
```

## Documentation

### Existing Documentation

- `/README.md` - Project overview and getting started
- `/packages/*/README.md` - Package-specific documentation
- Storybook - Interactive component documentation
- `/CHANGELOG.md` - Release notes

### Additional Resources

- [Lit Documentation](https://lit.dev/)
- [NX Documentation](https://nx.dev/)
- [Style Dictionary](https://styledictionary.com/)
- [Tokens Studio](https://tokens.studio/)

---

_This documentation is designed to help Claude instances quickly understand and work with the Craftzing Design System codebase. For questions or updates, refer to the project maintainers._

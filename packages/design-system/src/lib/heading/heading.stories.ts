import { CZHeading } from './heading.component.js';

CZHeading.define('cz-heading');

export default {
  title: 'Components/Heading',
  component: 'cz-heading',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['large', 'medium', 'small'],
    },
    headingTag: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A heading component with adjustable visual size and semantic HTML tag level.',
      },
    },
  },
};

export const Default = {
  args: {
    size: 'large',
    headingTag: 'h1',
  },
  render: (args) => `
    <cz-heading size="${args.size}" heading-tag="${args.headingTag}">
      Large heading
    </cz-heading>
  `,
};

export const Sizes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <cz-heading size="large" heading-tag="h1">Large heading</cz-heading>
      <cz-heading size="medium" heading-tag="h2">Medium heading</cz-heading>
      <cz-heading size="small" heading-tag="h3">Small heading</cz-heading>
    </div>
  `,
};

export const SemanticLevels = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <cz-heading size="large" heading-tag="h1">H1 with large size</cz-heading>
      <cz-heading size="medium" heading-tag="h2">H2 with medium size</cz-heading>
      <cz-heading size="small" heading-tag="h3">H3 with small size</cz-heading>
      <cz-heading size="large" heading-tag="h4">H4 with large size</cz-heading>
      <cz-heading size="medium" heading-tag="h5">H5 with medium size</cz-heading>
      <cz-heading size="small" heading-tag="h6">H6 with small size</cz-heading>
    </div>
  `,
};

export const IndependentSizeAndTag = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <cz-heading size="small" heading-tag="h1">H1 with small visual size</cz-heading>
      <cz-heading size="large" heading-tag="h6">H6 with large visual size</cz-heading>
      <cz-heading size="medium" heading-tag="h2">H2 with medium visual size</cz-heading>
    </div>
  `,
};
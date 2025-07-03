import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { CZPill } from './pill.component.ts';
import { CZPillProps } from './pill.types.ts';

CZPill.define('cz-pill');

const meta: Meta<CZPill> = {
  title: 'Components/Pill',
  component: 'cz-pill',
  render: ({ variant, size, disabled }: CZPillProps) => html`<cz-pill
    variant=${ifDefined(variant)}
    size=${ifDefined(size)}
    ?disabled=${disabled}
  >
    Pill content
  </cz-pill>`,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['large', 'medium'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'default',
    size: 'large',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<CZPill>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'large',
    disabled: false,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    size: 'large',
    disabled: false,
  },
};

export const Medium: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    disabled: false,
  },
};

export const ErrorMedium: Story = {
  args: {
    variant: 'error',
    size: 'medium',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'large',
    disabled: true,
  },
};

export const DisabledMedium: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    disabled: true,
  },
};
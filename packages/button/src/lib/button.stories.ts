import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { CZButton } from './button.component.js';
import { CZButtonProps } from './button.types.js';

CZButton.define('cz-button');

export default {
  title: "Components/Button",
  component: "cz-button",
  tags: ["autodocs"],
  render: ({appearance, size, href, disabled}: CZButtonProps) => html`<cz-button
    appearance=${ifDefined(appearance)}
    size=${ifDefined(size)}
    href=${ifDefined(href)}
    ?disabled=${disabled}
  >
    Craftzing button
  </cz-button>`,
  argTypes: {
    appearance: {
      control: { type: 'inline-radio' },
      options: ['default', 'primary', 'secondary'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['small', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    href: {
      control: { type: 'text' },
    },
  },
};

export const Appearance = {
  args: {
    appearance: 'primary',
    size: undefined,
  },
};

export const Size = {
  args: {
    size: 'small',
  },
};

export const Link = {
  args: {
    href: 'https://craftzing.com',
  },
};

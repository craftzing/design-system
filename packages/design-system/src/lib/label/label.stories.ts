import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { CZLabel } from './label.component.js';
import { CZLabelProps } from './label.types.js';

CZLabel.define('cz-label');

export default {
  title: "Components/Label",
  component: "cz-label",
  tags: ["autodocs"],
  render: ({ for: htmlFor, disabled }: CZLabelProps) => html`<cz-label
    for=${ifDefined(htmlFor)}
    ?disabled=${disabled}
  >
    Label
  </cz-label>`,
  argTypes: {
    for: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    for: undefined,
    disabled: false,
  },
};

export const WithFor = {
  args: {
    for: 'input-id',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    for: undefined,
    disabled: true,
  },
};
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { CZTextInput } from './text-input.component.js';
import { CZTextInputProps } from './text-input.types.js';
import { CZLabel } from '../label/label.component.js';

CZTextInput.define('cz-text-input');
CZLabel.define('cz-label');

export default {
  title: "Components/TextInput",
  component: "cz-text-input",
  tags: ["autodocs"],
  render: ({ type, state, value, placeholder, disabled, readonly, required, id, name }: CZTextInputProps) => html`<cz-text-input
    type=${ifDefined(type)}
    state=${ifDefined(state)}
    value=${ifDefined(value)}
    placeholder=${ifDefined(placeholder)}
    ?disabled=${disabled}
    ?readonly=${readonly}
    ?required=${required}
    id=${ifDefined(id)}
    name=${ifDefined(name)}
  ></cz-text-input>`,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel', 'url', 'search'],
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
    value: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readonly: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    id: {
      control: { type: 'text' },
    },
    name: {
      control: { type: 'text' },
    },
  },
};

export const Default = {
  args: {
    type: 'text',
    state: 'default',
    placeholder: 'Enter text...',
    disabled: false,
    readonly: false,
    required: false,
  },
};

export const WithValue = {
  args: {
    type: 'text',
    state: 'default',
    value: 'Text',
    disabled: false,
    readonly: false,
    required: false,
  },
};

export const Error = {
  args: {
    type: 'text',
    state: 'error',
    placeholder: 'Placeholder',
    disabled: false,
    readonly: false,
    required: false,
  },
};

export const Disabled = {
  args: {
    type: 'text',
    state: 'default',
    placeholder: 'Disabled input',
    disabled: true,
    readonly: false,
    required: false,
  },
};

export const Readonly = {
  args: {
    type: 'text',
    state: 'default',
    value: 'Readonly value',
    readonly: true,
    disabled: false,
    required: false,
  },
};

export const Email = {
  args: {
    type: 'email',
    state: 'default',
    placeholder: 'Enter email...',
    disabled: false,
    readonly: false,
    required: false,
  },
};

export const Password = {
  args: {
    type: 'password',
    state: 'default',
    placeholder: 'Enter password...',
    disabled: false,
    readonly: false,
    required: false,
  },
};

export const WithLabel = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 4px; max-width: 300px;">
      <cz-label for="input-with-label">Email Address</cz-label>
      <cz-text-input
        id="input-with-label"
        type="email"
        placeholder="Enter your email"
        required
      ></cz-text-input>
    </div>
  `,
};

export const WithLabelAndError = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 4px; max-width: 300px;">
      <cz-label for="input-with-error">Email Address</cz-label>
      <cz-text-input
        id="input-with-error"
        type="email"
        state="error"
        value="invalid-email"
        required
        aria-invalid="true"
      ></cz-text-input>
    </div>
  `,
};


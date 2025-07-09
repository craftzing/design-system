import { html } from 'lit';
import './card.js';
import '../button/button.js';
import '../heading/heading.js';

export default {
  title: 'Components/Card',
  component: 'cz-card',
  tags: ['autodocs'],
};

export const Default = () => html`
  <cz-card>
    <cz-heading slot="header" size="medium" heading-tag="h3">Medium heading</cz-heading>
    <p>This is the card body content. It can contain any HTML elements.</p>
    <div slot="actions">
      <cz-button>Button label</cz-button>
      <cz-button appearance="secondary">Button label</cz-button>
    </div>
  </cz-card>
`;

export const NoHeader = () => html`
  <cz-card>
    <p>This card has no header, just body content and actions.</p>
    <div slot="actions">
      <cz-button>Button label</cz-button>
      <cz-button appearance="secondary">Button label</cz-button>
    </div>
  </cz-card>
`;

export const NoActions = () => html`
  <cz-card>
    <cz-heading slot="header" size="medium" heading-tag="h3">Medium heading</cz-heading>
    <p>This card has no actions section, just header and body content.</p>
  </cz-card>
`;

export const BodyOnly = () => html`
  <cz-card>
    <p>This card contains only body content with no header or actions.</p>
  </cz-card>
`;
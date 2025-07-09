import { css, CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CZLabelProps } from './label.types.ts';

import { CraftzingElement } from 'craftzing-design-system-test-core';

class CZLabel extends CraftzingElement implements CZLabelProps {
  static styles: CSSResultGroup = css`
    .label {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      
      padding: var(--space-xxxs) 0;
      
      font-family: sans-serif;
      font-weight: var(--semibold);
      font-size: var(--size-m);
      line-height: var(--line-height-140);
      text-align: left;
      white-space: nowrap;
      
      color: var(--neutral-700);
      
      &:where([disabled], [aria-disabled='true']) {
        opacity: 0.5;
        cursor: default;
      }
    }
  `;

  @property({ type: String, reflect: true })
  for: string = undefined;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    const tag = literal`label`;

    return html`<${tag}
      ${spread(this.undeclaredAttributes)}
      class="label"
      for="${ifDefined(this.for)}"
      ?disabled="${this.disabled}"
      part="base"
    >
      <slot></slot>
    </${tag}>`;
  }
}

export { CZLabel };
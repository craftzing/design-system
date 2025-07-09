import { css, CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import classNames from 'classnames';
import {
  CZPillProps,
  CZPillVariant,
  CZPillSize,
} from './pill.types.ts';

import { CraftzingElement } from 'craftzing-design-system-test-core';

class CZPill extends CraftzingElement implements CZPillProps {
  static styles: CSSResultGroup = css`
    .pill {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      
      border-radius: var(--space-s);
      padding: var(--space-xxxs) var(--space-xxs);
      
      font-family: sans-serif;
      font-weight: var(--semibold);
      font-size: var(--size-m);
      line-height: var(--line-height-140);
      text-align: center;
      white-space: nowrap;
      
      transition: all 0.2s ease-in-out 0s;
      
      &:where([disabled], [aria-disabled='true']) {
        cursor: default;
        pointer-events: none;
        opacity: 0.5;
      }
    }

    .pill--variant-default {
      background-color: var(--primary-600);
      color: var(--typography-white);
      
      &:where([disabled], [aria-disabled='true']) {
        background-color: var(--neutral-200);
        color: var(--typography-white);
      }
    }

    .pill--variant-error {
      background-color: var(--error-600);
      color: var(--typography-white);
      
      &:where([disabled], [aria-disabled='true']) {
        background-color: var(--neutral-200);
        color: var(--typography-white);
      }
    }

    .pill--size-large {
      padding: var(--space-xxxs) var(--space-xxs);
      font-size: var(--size-m);
    }

    .pill--size-medium {
      padding: var(--space-xxxs) var(--space-xxs);
      font-size: var(--size-s);
    }
  `;

  @property({ reflect: true })
  variant: CZPillVariant = 'default';

  @property({ type: String, reflect: true })
  size: CZPillSize = 'large';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    const tag = literal`div`;

    return html`<${tag}
      ${spread(this.undeclaredAttributes)}
      class="${classNames([
        'pill',
        `pill--variant-${this.variant}`,
        `pill--size-${this.size}`,
      ])}"
      ?disabled="${this.disabled}"
      part="base"
    >
      <span class="pill__content" part="content">
        <slot></slot>
      </span>
    </${tag}>`;
  }
}

export { CZPill };
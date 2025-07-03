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
      
      border-radius: 15px;
      padding: 4px 8px;
      
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 1.4;
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
      background-color: #6b52d0;
      color: #ffffff;
      
      &:where([disabled], [aria-disabled='true']) {
        background-color: #ececed;
        color: #ffffff;
      }
    }

    .pill--variant-error {
      background-color: #da2828;
      color: #ffffff;
      
      &:where([disabled], [aria-disabled='true']) {
        background-color: #ececed;
        color: #ffffff;
      }
    }

    .pill--size-large {
      padding: 4px 8px;
      font-size: 16px;
    }

    .pill--size-medium {
      padding: 4px 8px;
      font-size: 14px;
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
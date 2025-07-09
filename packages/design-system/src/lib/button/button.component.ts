import { css, CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import classNames from 'classnames';
import {
  CZButtonProps,
  CZButtonAppearance,
  CZButtonSize,
} from './button.types.ts';

import { CraftzingElement } from 'craftzing-design-system-test-core';
// import buttonStyle from './button.css?inline';

class CZButton extends CraftzingElement implements CZButtonProps {
  // TODO: Add styles from external css sheet
  static styles: CSSResultGroup = css`
    .button {
      box-sizing: border-box;
      display: inline-flex;
      vertical-align: middle;
      align-items: center;
      justify-content: center;

      line-height: var(--line-height-140);
      font-weight: var(--bold);

      cursor: pointer;
      text-decoration: none;

      transition: all 0.2s ease-in-out 0s;
      border: var(--space-xxxs) solid transparent;

      &:active {
        transform: scale(0.95);
      }

      &:hover,
      &:focus-visible {
        opacity: 0.95;
      }

      &:where([disabled], [aria-disabled='true']) {
        cursor: default;
        pointer-events: none;
      }
    }

    .button--appearance-default {
      background-color: var(--primary-300);
      color: var(--typography-black);

      &:where([disabled], [aria-disabled='true']) {
        background-color: var(--neutral-200);
        color: var(--neutral-500);
      }
    }

    .button--appearance-primary {
      background-color: var(--primary-500);
      color: var(--typography-white);

      &:where([disabled], [aria-disabled='true']) {
        background-color: var(--neutral-300);
        color: var(--typography-white);
      }
    }

    .button--appearance-secondary {
      background-color: var(--white);
      color: var(--primary-600);

      &:where([disabled], [aria-disabled='true']) {
        background-color: var(--white);
        color: var(--neutral-400);
      }
    }

    .button--size-small {
      padding: var(--space-xxxs) var(--space-xs);
      font-family: sans-serif;
      font-size: var(--size-m);
    }

    .button--size-large {
      padding: var(--space-xxs) var(--space-m);
      font-family: sans-serif;
      font-size: var(--size-xl);
    }
  `;

  @property({ reflect: true })
  appearance: CZButtonAppearance = 'default';

  @property({ type: String, reflect: true })
  size: CZButtonSize = 'large';

  @property({ type: String, reflect: true })
  href: string = undefined;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    const tag = this.href ? literal`a` : literal`button`;

    return html`<${tag}
      ${spread(this.undeclaredAttributes)}
      class="${classNames([
        'button',
        `button--appearance-${this.appearance}`,
        `button--size-${this.size}`,
      ])}"
      href="${ifDefined(this.href && !this.disabled ? this.href : undefined)}"
      ?disabled="${this.disabled}"
      part="base"
    >
      <span class="button__content" part="content">
        <slot></slot>
      </span>
    </${tag}>`;
  }
}

export { CZButton };

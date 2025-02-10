import { CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import classNames from 'classnames';
import { CZButtonProps, CZButtonAppearance, CZButtonSize } from './button.types.js';

import { CraftzingElement, createStyles } from '@design-system/common';

import buttonStyle from './button.css?inline';

class CZButton extends CraftzingElement implements CZButtonProps {
  static styles:CSSResultGroup = createStyles(buttonStyle);

  @property({ reflect: true })
  appearance: CZButtonAppearance = "default";

  @property({ type: String, reflect: true })
  size: CZButtonSize = "large";

  @property({ type: String, reflect: true })
  href = undefined;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    const tag = this.href ? literal`a` : literal`button`;
    console.log(this.disabled);

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
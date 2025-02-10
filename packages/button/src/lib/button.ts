import { CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import classNames from 'classnames';

import { CraftzingElement, createStyles } from '@design-system/common';

// import { ChLoader } from '../loader/loader.component.ts';
// import { ChIcon } from '../icon/icon.component.ts';

import buttonStyle from "./button.css?inline";

/**
 * @tag cz-button
 * @summary Buttons indicate possible actions or choices to a user.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The component's content.
 */
class CZButton extends CraftzingElement {
  static styles:CSSResultGroup = createStyles(buttonStyle);

  @property({ type: String, reflect: true })
  appearance: 'default' | 'primary' | 'secondary' | 'tertiary' | undefined = 'default';

  @property({ type: String, reflect: true })
  size: "sm" | "lg" | undefined = "lg";

  @property({ type: String, reflect: true })
  width: "auto" | "full" | undefined = "auto";

  @property({ type: String, reflect: true })
  href: string | undefined;

  // static dependencies = {
  //   'ch-loader': ChLoader,
  //   'ch-icon': ChIcon,
  // };

  render() {
    // const iconSize = this.size === 'sm' ? 'sm' : 'md';
    const tag = this.href ? literal`a` : literal`button`;

    return html`<${tag}
      ${spread(this.undeclaredAttributes)}
      class="${classNames([
       'button',
        `button--appearance-${this.appearance}`,
        `button--size-${this.size}`,
        `button--width-${this.width}`,
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
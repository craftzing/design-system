import { CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';

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
      class="${classMap({
        button: true,
        'button--appearance-default': this.appearance === 'default',
        'button--appearance-primary': this.appearance === 'primary',
        'button--appearance-secondary': this.appearance === 'secondary',
        'button--appearance-tertiary': this.appearance === 'tertiary',
        'button--size-sm': this.size === 'sm',
        'button--size-lg': this.size === 'lg',
        'button--width-full': this.width === 'full',
        'is-disabled': !!(this.disabled),
      })}"
      href="${ifDefined(this.href && !this.disabled ? this.href : undefined)}"
      ?disabled="${this.disabled}"
      part="base"
      ${spread(this.undeclaredAttributes)}
    >
      <span className="button__content" part="content">
        <slot></slot>
      </span>
    </button>`;
  }
}

export { CZButton };

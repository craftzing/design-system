import { css, CSSResultGroup } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import classNames from 'classnames';
import { CraftzingElement } from 'craftzing-design-system-test-core';
import { HeadingSize, HeadingLevel, HeadingProps } from './heading.types.js';

class CZHeading extends CraftzingElement implements HeadingProps {
  static styles: CSSResultGroup = css`
    :host {
      display: block;
      box-sizing: border-box;
      padding: 0.125rem 0;
    }

    .heading {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-style: normal;
      line-height: 1.4;
      color: var(--neutral-700, #4b4855);
      margin: 0;
      white-space: nowrap;
    }

    .heading--large {
      font-size: 2rem;
    }

    .heading--medium {
      font-size: 1.75rem;
    }

    .heading--small {
      font-size: 1.5rem;
    }
  `;

  @property({ reflect: true })
  size: HeadingSize = 'large';

  @property({ attribute: 'heading-tag', reflect: true })
  headingTag: HeadingLevel = 'h1';

  render() {
    const tag = unsafeStatic(this.headingTag);

    return html`<${tag}
      ${spread(this.undeclaredAttributes)}
      class="${classNames([
        'heading',
        `heading--${this.size}`,
      ])}"
      part="base"
    >
      <slot></slot>
    </${tag}>`;
  }
}

export { CZHeading };
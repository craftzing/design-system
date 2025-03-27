import { css, CSSResult, unsafeCSS } from 'lit';

/**
 * Lit mimics spec bahviour by default.
 * When supported, styling will be added using CSSStyleSheets.
 * When not supported, styling will be added using style tags.
 *
 * Source code: https://github.com/lit/lit-element/blob/f2184da66a7b0c692d32c25d99aa00d7fc45e5bf/src/lit-element.ts#L249
 */

export const createStyles = (cssText: string): CSSResult => {
  return css`
    ${unsafeCSS(cssText)}
  `;
};

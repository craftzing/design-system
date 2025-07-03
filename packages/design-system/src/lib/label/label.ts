import { CZLabel } from './label.component.ts';

export { CZLabel };

CZLabel.define('cz-label');

declare global {
  interface HTMLElementTagNameMap {
    'cz-label': CZLabel;
  }
}

import { CZPill } from './pill.component.ts';

export { CZPill };

CZPill.define('cz-pill');

declare global {
  interface HTMLElementTagNameMap {
    'cz-pill': CZPill;
  }
}

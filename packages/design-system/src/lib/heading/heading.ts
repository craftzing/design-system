import { CZHeading } from './heading.component.ts';

export { CZHeading };

CZHeading.define('cz-heading');

declare global {
  interface HTMLElementTagNameMap {
    'cz-heading': CZHeading;
  }
}

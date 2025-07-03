import { CZLabel } from './label.component.ts';

if (!customElements.get('cz-label')) {
  customElements.define('cz-label', CZLabel);
}

export { CZLabel };
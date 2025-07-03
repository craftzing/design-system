import { CZPill } from './pill.component.ts';

if (!customElements.get('cz-pill')) {
  customElements.define('cz-pill', CZPill);
}

export { CZPill };
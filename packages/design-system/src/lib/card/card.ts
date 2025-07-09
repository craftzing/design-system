import { CZCard } from './card.component.ts';

export { CZCard };

CZCard.define('cz-card');

declare global {
  interface HTMLElementTagNameMap {
    'cz-card': CZCard;
  }
}

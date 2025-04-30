import { CZButton } from './button.component.ts';

export { CZButton };

CZButton.define('cz-button');

declare global {
  interface HTMLElementTagNameMap {
    'cz-button': CZButton;
  }
}

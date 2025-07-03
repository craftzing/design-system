import { CZTextInput } from './text-input.component.ts';

export { CZTextInput };

CZTextInput.define('cz-text-input');

declare global {
  interface HTMLElementTagNameMap {
    'cz-text-input': CZTextInput;
  }
}

import { CZTextInput } from './text-input.component.ts';

if (!customElements.get('cz-text-input')) {
  customElements.define('cz-text-input', CZTextInput);
}

export { CZTextInput };
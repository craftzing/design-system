import { describe, it, expect } from 'vitest';
import { CZButton } from './button.component.js';

describe('CraftzingElement', () => {
  it('should register on construction', () => {
    CZButton.define('cz-button', CZButton);

    expect(customElements.get('cz-button')).toBeDefined();
  });
});

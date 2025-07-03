import { expect, fixture, html } from '@open-wc/testing';
import { CZLabel } from './label.ts';

describe('CZLabel', () => {
  it('should render with default properties', async () => {
    const el = await fixture<CZLabel>(html`<cz-label>Label text</cz-label>`);
    
    expect(el.for).to.equal(undefined);
    expect(el.disabled).to.equal(false);
  });

  it('should render with for attribute', async () => {
    const el = await fixture<CZLabel>(html`<cz-label for="input-id">Label text</cz-label>`);
    
    expect(el.for).to.equal('input-id');
  });

  it('should render as disabled', async () => {
    const el = await fixture<CZLabel>(html`<cz-label disabled>Label text</cz-label>`);
    
    expect(el.disabled).to.equal(true);
  });

  it('should render slot content', async () => {
    const el = await fixture<CZLabel>(html`<cz-label>Test Content</cz-label>`);
    
    expect(el.textContent?.trim()).to.equal('Test Content');
  });

  it('should render as label element', async () => {
    const el = await fixture<CZLabel>(html`<cz-label>Label text</cz-label>`);
    
    const labelElement = el.shadowRoot?.querySelector('label');
    expect(labelElement).to.exist;
  });
});
import { expect, fixture, html } from '@open-wc/testing';
import { CZPill } from './pill.ts';

describe('CZPill', () => {
  it('should render with default properties', async () => {
    const el = await fixture<CZPill>(html`<cz-pill>Pill content</cz-pill>`);
    
    expect(el.variant).to.equal('default');
    expect(el.size).to.equal('large');
    expect(el.disabled).to.equal(false);
  });

  it('should render with custom variant', async () => {
    const el = await fixture<CZPill>(html`<cz-pill variant="default">Pill content</cz-pill>`);
    
    expect(el.variant).to.equal('default');
  });

  it('should render with custom size', async () => {
    const el = await fixture<CZPill>(html`<cz-pill size="large">Pill content</cz-pill>`);
    
    expect(el.size).to.equal('large');
  });

  it('should render as disabled', async () => {
    const el = await fixture<CZPill>(html`<cz-pill disabled>Pill content</cz-pill>`);
    
    expect(el.disabled).to.equal(true);
  });

  it('should render slot content', async () => {
    const el = await fixture<CZPill>(html`<cz-pill>Test Content</cz-pill>`);
    
    expect(el.textContent?.trim()).to.equal('Test Content');
  });
});
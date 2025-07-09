import { expect, fixture, html, aTimeout } from '@open-wc/testing';
import { CZTextInput } from './text-input.ts';

describe('CZTextInput', () => {
  it('should render with default properties', async () => {
    const el = await fixture<CZTextInput>(html`<cz-text-input></cz-text-input>`);
    
    expect(el.type).to.equal('text');
    expect(el.state).to.equal('default');
    expect(el.value).to.equal('');
    expect(el.disabled).to.equal(false);
    expect(el.readonly).to.equal(false);
    expect(el.required).to.equal(false);
  });

  it('should render with custom properties', async () => {
    const el = await fixture<CZTextInput>(html`
      <cz-text-input
        type="email"
        state="error"
        value="test@example.com"
        placeholder="Enter email"
        disabled
        required
        id="test-input"
        name="email"
      ></cz-text-input>
    `);
    
    expect(el.type).to.equal('email');
    expect(el.state).to.equal('error');
    expect(el.value).to.equal('test@example.com');
    expect(el.placeholder).to.equal('Enter email');
    expect(el.disabled).to.equal(true);
    expect(el.required).to.equal(true);
    expect(el.id).to.equal('test-input');
    expect(el.name).to.equal('email');
  });

  it('should update value on input', async () => {
    const el = await fixture<CZTextInput>(html`<cz-text-input></cz-text-input>`);
    
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input).to.exist;
    
    input.value = 'new value';
    input.dispatchEvent(new Event('input'));
    
    await aTimeout(0);
    expect(el.value).to.equal('new value');
  });

  it('should dispatch custom events', async () => {
    const el = await fixture<CZTextInput>(html`<cz-text-input></cz-text-input>`);
    
    let inputEventFired = false;
    let changeEventFired = false;
    let focusEventFired = false;
    let blurEventFired = false;
    
    el.addEventListener('input', () => { inputEventFired = true; });
    el.addEventListener('change', () => { changeEventFired = true; });
    el.addEventListener('focus', () => { focusEventFired = true; });
    el.addEventListener('blur', () => { blurEventFired = true; });
    
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('focus'));
    input.dispatchEvent(new Event('blur'));
    
    await aTimeout(0);
    
    expect(inputEventFired).to.be.true;
    expect(changeEventFired).to.be.true;
    expect(focusEventFired).to.be.true;
    expect(blurEventFired).to.be.true;
  });

  it('should set aria attributes correctly', async () => {
    const el = await fixture<CZTextInput>(html`
      <cz-text-input
        state="error"
        required
        aria-describedby="error-msg"
      ></cz-text-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    
    expect(input.getAttribute('aria-invalid')).to.equal('true');
    expect(input.getAttribute('aria-required')).to.equal('true');
    expect(input.getAttribute('aria-describedby')).to.equal('error-msg');
  });

  it('should work with label for accessibility', async () => {
    const container = await fixture(html`
      <div>
        <label for="test-input">Test Label</label>
        <cz-text-input id="test-input"></cz-text-input>
      </div>
    `);
    
    const label = container.querySelector('label') as HTMLLabelElement;
    const input = container.querySelector('cz-text-input') as CZTextInput;
    const inputField = input.shadowRoot?.querySelector('input') as HTMLInputElement;
    
    expect(label.getAttribute('for')).to.equal('test-input');
    expect(inputField.getAttribute('id')).to.equal('test-input');
    
    // Test that clicking label focuses input
    let focusEventFired = false;
    input.addEventListener('focus', () => { focusEventFired = true; });
    
    label.click();
    await aTimeout(0);
    
    expect(focusEventFired).to.be.true;
  });

  it('should handle different input types', async () => {
    const types = ['text', 'email', 'password', 'tel', 'url', 'search'];
    
    for (const type of types) {
      const el = await fixture<CZTextInput>(html`<cz-text-input type="${type}"></cz-text-input>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
      
      expect(input.type).to.equal(type);
    }
  });

  it('should apply error state correctly', async () => {
    const el = await fixture<CZTextInput>(html`<cz-text-input state="error"></cz-text-input>`);
    
    const container = el.shadowRoot?.querySelector('.text-input') as HTMLElement;
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    
    expect(container.classList.contains('text-input--state-error')).to.be.true;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
  });
});
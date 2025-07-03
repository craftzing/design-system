import { css, CSSResultGroup } from 'lit';
import { html } from 'lit/static-html.js';
import { property, state } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import { ifDefined } from 'lit/directives/if-defined.js';
import classNames from 'classnames';
import {
  CZTextInputProps,
  CZTextInputState,
  CZTextInputType,
} from './text-input.types.ts';

import { CraftzingElement } from 'craftzing-design-system-test-core';

class CZTextInput extends CraftzingElement implements CZTextInputProps {
  static styles: CSSResultGroup = css`
    .text-input {
      position: relative;
      display: inline-block;
      width: 100%;
      border-radius: 4px;
    }

    .text-input__field {
      box-sizing: border-box;
      width: 100%;
      padding: 4px 8px;
      
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.4;
      
      color: #161320;
      background-color: transparent;
      border: 1px solid #706d78;
      border-radius: 4px;
      
      outline: none;
      transition: all 0.2s ease-in-out;
      
      &::placeholder {
        color: #a7a6ac;
      }
      
      &:hover {
        border-color: #6b52d0;
      }
      
      &:focus {
        border-color: #6b52d0;
        outline: none;
      }
      
      &:focus-visible {
        border-color: #6b52d0;
        outline: 3px solid #706d78;
        outline-offset: 1px;
      }
      
      &:where([disabled]) {
        cursor: not-allowed;
        opacity: 0.5;
        background-color: #f5f5f5;
      }
      
      &:where([readonly]) {
        cursor: default;
        background-color: transparent;
        border: none;
        border-left: 1px solid #6b52d0;
        border-radius: 0;
        
        &:focus,
        &:focus-visible {
          border: none;
          border-left: 1px solid #6b52d0;
          outline: none;
        }
      }
    }

    .text-input--state-error .text-input__field {
      border-color: #da2828;
      background-color: #fef2f2;
      
      &:hover,
      &:focus {
        border-color: #da2828;
        box-shadow: 0 0 0 1px #da2828;
      }
    }
  `;

  @property({ type: String, reflect: true })
  type: CZTextInputType = 'text';

  @property({ type: String, reflect: true })
  state: CZTextInputState = 'default';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  id: string = undefined;

  @property({ type: String })
  name: string = undefined;

  @property({ type: String })
  autocomplete: string = undefined;

  @property({ type: Number })
  maxlength: number = undefined;

  @property({ type: Number })
  minlength: number = undefined;

  @property({ type: String })
  pattern: string = undefined;

  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy: string = undefined;

  @property({ type: Boolean, attribute: 'aria-invalid' })
  ariaInvalidProp = false;

  @property({ type: Boolean, attribute: 'aria-required' })
  ariaRequiredProp = false;

  @state()
  private _hasFocus = false;

  private _handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    
    // Dispatch custom input event
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    
    // Dispatch custom change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleFocus() {
    this._hasFocus = true;
    this.dispatchEvent(new CustomEvent('focus', {
      bubbles: true,
      composed: true
    }));
  }

  private _handleBlur() {
    this._hasFocus = false;
    this.dispatchEvent(new CustomEvent('blur', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const computedAriaInvalid = this.ariaInvalidProp || this.state === 'error';
    const computedAriaRequired = this.ariaRequiredProp || this.required;

    return html`
      <div class="${classNames([
        'text-input',
        `text-input--state-${this.state}`,
        { 'text-input--focused': this._hasFocus }
      ])}" part="base">
        <input
          ${spread(this.undeclaredAttributes)}
          class="text-input__field"
          type="${this.type}"
          .value="${this.value}"
          placeholder="${ifDefined(this.placeholder || undefined)}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          id="${ifDefined(this.id)}"
          name="${ifDefined(this.name)}"
          autocomplete="${ifDefined(this.autocomplete)}"
          maxlength="${ifDefined(this.maxlength)}"
          minlength="${ifDefined(this.minlength)}"
          pattern="${ifDefined(this.pattern)}"
          aria-describedby="${ifDefined(this.ariaDescribedBy)}"
          aria-invalid="${computedAriaInvalid}"
          aria-required="${computedAriaRequired}"
          tabindex="${this.readonly ? '-1' : '0'}"
          @input="${this._handleInput}"
          @change="${this._handleChange}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          part="field"
        />
      </div>
    `;
  }
}

export { CZTextInput };
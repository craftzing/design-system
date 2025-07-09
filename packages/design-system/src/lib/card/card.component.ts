import { css, CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { spread } from '@open-wc/lit-helpers';
import classNames from 'classnames';
import { CraftzingElement } from 'craftzing-design-system-test-core';

class CZCard extends CraftzingElement {
  static styles: CSSResultGroup = css`
    .card {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: var(--white);
      border: 1px solid var(--primary-500);
      border-radius: var(--space-xxxs);
      overflow: hidden;
    }

    .card-header {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: var(--space-m) var(--space-m) var(--space-s) var(--space-m);
      border-bottom: 1px solid var(--primary-500);
    }

    .card-body {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: var(--space-s) var(--space-m);
      flex: 1;
    }

    .card-actions {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      gap: var(--space-m);
      align-items: center;
      justify-content: flex-start;
      padding: var(--space-s) var(--space-m) var(--space-m) var(--space-m);
      border-top: 1px solid var(--primary-500);
    }
  `;

  private _hasHeaderContent = false;
  private _hasActionsContent = false;

  private _handleHeaderSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._hasHeaderContent = slot.assignedElements().length > 0;
    this.requestUpdate();
  };

  private _handleActionsSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._hasActionsContent = slot.assignedElements().length > 0;
    this.requestUpdate();
  };

  render() {
    const tag = literal`div`;
    
    return html`<${tag}
      ${spread(this.undeclaredAttributes)}
      class="${classNames(['card'])}"
      part="base"
    >
      ${this._hasHeaderContent ? html`
        <div class="card-header" part="header">
          <slot name="header" @slotchange=${this._handleHeaderSlotChange}></slot>
        </div>
      ` : html`
        <slot name="header" @slotchange=${this._handleHeaderSlotChange} style="display: none;"></slot>
      `}
      
      <div class="card-body" part="body">
        <slot></slot>
      </div>
      
      ${this._hasActionsContent ? html`
        <div class="card-actions" part="actions">
          <slot name="actions" @slotchange=${this._handleActionsSlotChange}></slot>
        </div>
      ` : html`
        <slot name="actions" @slotchange=${this._handleActionsSlotChange} style="display: none;"></slot>
      `}
    </${tag}>`;
  }
}

export { CZCard };
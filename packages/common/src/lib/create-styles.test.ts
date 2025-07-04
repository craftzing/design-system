import { describe, it, expect, afterEach } from 'vitest';
import { createStyles } from './create-styles.js';

describe('createStyles', () => {
  const originalWindow = (globalThis as any).window;
  const originalDocument = (globalThis as any).Document;

  afterEach(() => {
    if (originalWindow === undefined) {
      delete (globalThis as any).window;
    } else {
      (globalThis as any).window = originalWindow;
    }

    if (originalDocument === undefined) {
      delete (globalThis as any).Document;
    } else {
      (globalThis as any).Document = originalDocument;
    }
  });

  it('returns a CSSStyleSheet when constructable stylesheets are supported', () => {
    class FakeSheet {
      replaceSync(_css: string) {}
    }
    (FakeSheet as any).prototype.replaceSync = function () {};
    const FakeDoc = function () {} as any;
    FakeDoc.prototype = { adoptedStyleSheets: [] };

    (globalThis as any).window = { CSSStyleSheet: FakeSheet };
    (globalThis as any).Document = FakeDoc;

    const result = createStyles('body{}');
    expect(result).toBeInstanceOf(FakeSheet);
  });
});


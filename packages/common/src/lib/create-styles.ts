import { css, unsafeCSS } from "lit";

const { warn } = console;

const hasConstructableStylesheetsSupport = () =>
  typeof window !== "undefined" &&
  "CSSStyleSheet" in window &&
  "adoptedStyleSheets" in Document.prototype &&
  "replaceSync" in CSSStyleSheet.prototype;

export const createStyles = (cssText: string) => {
  if (!hasConstructableStylesheetsSupport()) {
    return css`
      ${unsafeCSS(cssText)}
    `;
  }

  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    return css`
      ${unsafeCSS(cssText)}
    `;
  } catch (error) {
    warn("Failed to create CSSStyleSheet:", error);
    return css`
      ${unsafeCSS(cssText)}
    `;
  }
};

import { css, unsafeCSS } from 'lit';
import hostStylesCSS from './host-styles.css?inline';

// TODO: Refactor to createStyles helper once @design-system/common is moved to libs folder.

export const hostStyles = css`
  ${unsafeCSS(hostStylesCSS)}
`;

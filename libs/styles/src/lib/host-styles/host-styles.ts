import hostStylesCSS from './host-styles.css?inline';
import { createStyles } from '@design-system/shared';

// TODO: Refactor to createStyles helper once @design-system/common is moved to libs folder.

export const hostStyles = createStyles(hostStylesCSS);

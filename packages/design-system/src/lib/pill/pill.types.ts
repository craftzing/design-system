export type CZPillVariant = 'default' | 'error';
export type CZPillSize = 'large' | 'medium';
export type CZPillProps = {
  variant?: CZPillVariant;
  size?: CZPillSize;
  disabled?: boolean;
}
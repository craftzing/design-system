export type CZButtonAppearance = 'default' | 'primary' | 'secondary';
export type CZButtonSize = 'small' | 'large';
export type CZButtonProps = {
  appearance?: CZButtonAppearance;
  size?: CZButtonSize;
  href?: string;
  disabled?: boolean;
}
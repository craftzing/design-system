export type CZTextInputState = 'default' | 'error';
export type CZTextInputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';

export type CZTextInputProps = {
  type?: CZTextInputType;
  state?: CZTextInputState;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  autocomplete?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}
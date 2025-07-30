import type { MouseEventHandler } from 'react';

export interface DefaultButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  activeTheme?: 'black' | 'white' | 'grey' | 'borderGrey';
  disabledTheme?: 'base';
  text?: string;
  // 추가적인 테일윈드 요소
  additionalStyles?: string;
  type?: 'button' | 'submit' | 'reset';
  useDisabled?: boolean;
}

export interface ModalButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  theme?: 'black' | 'white' | 'red';
  text: string;
}

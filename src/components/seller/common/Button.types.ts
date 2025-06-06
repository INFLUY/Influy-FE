import type { MouseEventHandler } from 'react';

export interface SaveButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  activeColor?: string;
  disabledColor?: string;
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

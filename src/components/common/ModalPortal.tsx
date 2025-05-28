import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  const root = document.getElementById('modal');
  if (!root) return;
  return ReactDOM.createPortal(children, root);
};

export default ModalPortal;

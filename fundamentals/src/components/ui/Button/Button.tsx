import type { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

interface ButtonTextProps {
  children: ReactNode;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="custom-btn" onClick={onClick}>
      {children}
    </button>
  );
};

const ButtonText = ({ children }: ButtonTextProps) => {
  return <span>{children}</span>;
};

Button.Text = ButtonText;

import React from 'react';
import './button.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: string;
}

const Button: React.FC<Props> = ({ children, className = '', width = '100%', style, ...props }) => {
  return (
    <button
      className={`button ${className}`}
      style={{
        width,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';

interface ButtonProps {
  text: string;
  type: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, type, onClick }) => {
  const buttonClassName = `button ${type}`;
  return (
    <button className={buttonClassName} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
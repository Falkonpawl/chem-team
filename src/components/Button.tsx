import React from 'react';

interface ButtonProps {
  text: string;
  type: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  isSent?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, type, onClick, disabled, isSent }) => {
  let buttonClassName = `button ${type}`;
  if (isSent) buttonClassName += ' sent';

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled || isSent}>
      {isSent ? 'Отправлено' : text}
    </button>
  );
};

export default Button;
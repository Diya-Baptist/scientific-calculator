import React from 'react';
import './Button.css';

const Button = ({ label, onClick, className }) => {
  return (
    <button className={`button ${className}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;

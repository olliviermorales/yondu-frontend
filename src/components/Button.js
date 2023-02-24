import React, { useContext } from 'react';
import CalculatorContext from '../contexts/CalculatorContext';

function Button({ label, type, wide }) {
  const { handleClick } = useContext(CalculatorContext);
  return (
    <button
      className={`button ${type}${wide ? ' wide' : ''}`}
      onClick={() => handleClick(label)}
    >
      {label}
    </button>
  );
}

export default Button;

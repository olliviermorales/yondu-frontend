import React, { useContext } from 'react';
import CalculatorContext from '../contexts/CalculatorContext';

// Dumb component for the display
function Display() {
  const { displayValue } = useContext(CalculatorContext);
  return <div className="display">{displayValue}</div>;
}

export default Display;

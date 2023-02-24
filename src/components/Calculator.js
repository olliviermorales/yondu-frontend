import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CalculatorContext from '../contexts/CalculatorContext';
import Button from './Button';
import Display from './Display';

// Smart component that handles the calculator logic
function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [storedValue, setStoredValue] = useState(null);

  // Handle button clicks
  const handleClick = useCallback(
    (value) => {
      switch (value) {
        case 'AC':
          setDisplayValue('0');
          setOperator(null);
          setWaitingForOperand(false);
          setStoredValue(null);
          break;
        case 'Backspace':
          setDisplayValue(
            displayValue.substring(0, displayValue.length - 1) || '0'
          );

          break;
        case '+/-':
          setDisplayValue(
            displayValue.charAt(0) === '-'
              ? displayValue.slice(1)
              : '-' + displayValue
          );
          break;
        case '%':
          setDisplayValue((parseFloat(displayValue) / 100).toString());
          break;
        case '.':
          if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
          }
          break;
        case '+':
        case '-':
        case 'x':
        case '/':
          setWaitingForOperand(true);
          setOperator(value);
          setStoredValue(parseFloat(displayValue));
          break;
        case '=':
          const currentValue = parseFloat(displayValue);
          let newValue;
          switch (operator) {
            case '+':
              newValue = storedValue + currentValue;
              break;
            case '-':
              newValue = storedValue - currentValue;
              break;
            case 'x':
              newValue = storedValue * currentValue;
              break;
            case '/':
              newValue = storedValue / currentValue;
              break;
            default:
              newValue = currentValue;
          }
          setDisplayValue(newValue.toString());
          setOperator(null);
          setWaitingForOperand(false);
          setStoredValue(null);
          break;
        default:
          if (waitingForOperand) {
            setDisplayValue(value);
            setWaitingForOperand(false);
          } else {
            setDisplayValue(
              displayValue === '0' ? value : displayValue + value
            );
          }
          break;
      }
    },
    [displayValue, operator, waitingForOperand, storedValue]
  );

  // Handle key presses
  const handleKeyDown = useCallback(
    (event) => {
      const value = event.key;
      if (value >= '0' && value <= '9') {
        handleClick(value);
      } else {
        switch (value) {
          case '+':
          case '-':
          case '*':
          case '/':
            handleClick(value === '*' ? 'x' : value);
            break;
          case '=':
          case 'Enter':
            event.preventDefault(6);
            handleClick('=');
            break;
          case 'Backspace':
            handleClick('Backspace');
            break;
          case 'Escape':
            handleClick('AC');
            break;
          case '%':
            handleClick('%');
            break;
          case '.':
            handleClick('.');
            break;
          default:
            break;
        }
      }
    },
    [handleClick]
  );

  // Add key press listener on mount and remove on unmount
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ displayValue, handleClick }),
    [displayValue, handleClick]
  );

  return (
    <CalculatorContext.Provider value={contextValue}>
      <div className="calculator">
        <Display />
        <Button label="AC" type="function" />
        <Button label="+/-" type="function" />
        <Button label="%" type="function" />
        <Button label="/" type="operator" />
        <Button label="7" type="number" />
        <Button label="8" type="number" />
        <Button label="9" type="number" />
        <Button label="x" type="operator" />
        <Button label="4" type="number" />
        <Button label="5" type="number" />
        <Button label="6" type="number" />
        <Button label="-" type="operator" />
        <Button label="1" type="number" />
        <Button label="2" type="number" />
        <Button label="3" type="number" />
        <Button label="+" type="operator" />
        <Button label="0" type="number" wide />
        <Button label="." type="number" />
        <Button label="=" type="operator" />
      </div>
    </CalculatorContext.Provider>
  );
}

export default Calculator;

import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import Confetti from './Confetti';
import './Calculator.css';
import * as math from 'mathjs';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRad, setIsRad] = useState(true); // state to toggle between radians and degrees
  const [isSecondary, setIsSecondary] = useState(false); // state to toggle between primary and secondary functions
  const [memory, setMemory] = useState(null);
  const [theme, setTheme] = useState('dark'); // state for theme toggle
  const [showHistory, setShowHistory] = useState(false); // state to toggle history visibility
  const [history, setHistory] = useState([]); // state for history of calculations

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        let evaluatedResult;
        // Handle degree to radian conversion for trigonometric functions if necessary
        if (!isRad) {
          const degToRad = (angle) => angle * (Math.PI / 180);
          const radianInput = input.replace(/(sin|cos|tan|sinh|cosh|tanh)\(([^)]+)\)/g, (_, func, angle) => `${func}(${degToRad(parseFloat(angle))})`);
          evaluatedResult = math.evaluate(radianInput);
        } else {
          evaluatedResult = math.evaluate(input);
        }

        setResult(evaluatedResult);
        setHistory((prevHistory) => [...prevHistory, `${input} = ${evaluatedResult}`]);

        if (input.includes('5') && input.includes('6')) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }

        setInput(evaluatedResult.toString());
      } catch (error) {
        setResult('Error');
        setInput('');
      }
    } else if (value === 'AC') {
      setInput('');
      setResult(null);
    } else if (value === 'C') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (value === 'Rad') {
      setIsRad(!isRad);
    } else if (value === 'mc') {
      setMemory(null);
    } else if (value === 'm+') {
      setMemory((prevMemory) => (prevMemory !== null ? prevMemory + parseFloat(input) : parseFloat(input)));
    } else if (value === 'm-') {
      setMemory((prevMemory) => (prevMemory !== null ? prevMemory - parseFloat(input) : -parseFloat(input)));
    } else if (value === 'mr') {
      setInput(memory !== null ? memory.toString() : '');
    } else if (value === '2nd') {
      setIsSecondary((prevIsSecondary) => !prevIsSecondary);
    } else if (value === 'xʸ') {
      setInput((prevInput) => prevInput + '^');
    } else if (value === '¹/x') {
      setInput((prevInput) => `1/(${prevInput})`);
    } else if (value === '²√x') {
      setInput((prevInput) => `sqrt(${prevInput})`);
    } else if (value === '³√x') {
      setInput((prevInput) => `cbrt(${prevInput})`);
    } else if (value === 'ʸ√x') {
      setInput((prevInput) => prevInput + '√');
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷', '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', 
    '1', '2', '3', '×', '¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', 
    '4', '5', '6', '-', 'x!', 'sin', 'cos', 'tan', 'e', 'EE', 
    '7', '8', '9', '+', 'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', 
    '0', '.', '='
  ];

  const buttonLabels = {
    '÷': '/', '×': '*', '−': '-', '+': '+', 'sin': 'sin(', 'cos': 'cos(', 'tan': 'tan(', 'log': 'log10(', 
    'sinh': 'sinh(', 'cosh': 'cosh(', 'tanh': 'tanh(', 'ln': 'log(', 'log₁₀': 'log10(', 'x²': '^2', 'x³': '^3', 'eˣ': 'exp(', 
    '10ˣ': '10^(', '√': 'sqrt(', 'x!': '!', '(': '(', ')': ')', '±': '-', 'π': 'pi', 'e': 'e', 'EE': 'e', 'Rand': 'random()', 
    'xʸ': '^', '²√x': 'sqrt(', '³√x': 'cbrt(', 'ʸ√x': 'root('
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleHistory = () => {
    setShowHistory((prevShowHistory) => !prevShowHistory);
  };

  return (
    <div className={`calculator ${theme}`}>
      <Display input={input} result={result} className={`result ${theme === 'light' ? 'light' : ''}`} />
      <div className="theme-switcher">
        <button onClick={toggleTheme}>Convert {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
        <button onClick={toggleHistory}>History</button>
      </div>
      <div className="buttons">
        {buttons.map((button) => (
          button === '0' ? (
            <Button key={button} label={button} className="double-width light-grey" onClick={() => handleButtonClick(buttonLabels[button] || button)} />
          ) : (
            <Button key={button} label={button} className={button.match(/^[0-9.]$/) ? 'grey' : button === '÷' || button === '×' || button === '=' || button === '+' || button === '-' ? 'orange' : ''} onClick={() => handleButtonClick(buttonLabels[button] || button)} />
          )
        ))}
      </div>
      {showConfetti && <Confetti />}
      {showHistory && (
        <div className="history">
          <h3>History</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;

import React from 'react';
import './Display.css';

const Display = ({ input, result }) => {
  return (
    <div className="display">
      <div className="input">{input}</div>
      <div className="result">{result}</div>
    </div>
  );
};

export default Display;

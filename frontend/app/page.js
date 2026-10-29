'use client';

import { useState } from 'react';

export default function Home() {
  // Calculator with Radio Buttons State
  const [radioNum1, setRadioNum1] = useState('');
  const [radioNum2, setRadioNum2] = useState('');
  const [radioOperation, setRadioOperation] = useState('add');
  const [radioResult, setRadioResult] = useState('');

  // Calculator with Buttons State
  const [btnNum1, setBtnNum1] = useState('');
  const [btnNum2, setBtnNum2] = useState('');
  const [btnResult, setBtnResult] = useState('');

  // Normal Calculator State
  const [normalDisplay, setNormalDisplay] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [currentOperation, setCurrentOperation] = useState(null);

  const calculate = async (num1, num2, operation) => {
    try {
      const response = await fetch('http://localhost:3001/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num1: parseFloat(num1),
          num2: parseFloat(num2),
          operation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return data.result;
      } else {
        return data.error || 'Error occurred';
      }
    } catch (error) {
      console.error('Error calculating:', error);
      return 'Network error';
    }
  };

  const handleRadioCalculate = async () => {
    if (radioNum1 === '' || radioNum2 === '') {
      setRadioResult('Invalid numbers');
      return;
    }
    const result = await calculate(radioNum1, radioNum2, radioOperation);
    setRadioResult(result.toString());
  };

  const handleBtnCalculate = async (operation) => {
    if (btnNum1 === '' || btnNum2 === '') {
      setBtnResult('Invalid numbers');
      return;
    }
    const result = await calculate(btnNum1, btnNum2, operation);
    setBtnResult(result.toString());
  };

  const handleNumClick = (num) => {
    const newInput = currentInput + num;
    setCurrentInput(newInput);
    setNormalDisplay(newInput);
  };

  const handleOpClick = (op) => {
    if (currentInput === '') return;
    setCurrentOperation({
      num1: parseFloat(currentInput),
      operation: op,
    });
    setCurrentInput('');
  };

  const handleNormalCalculate = async () => {
    if (!currentOperation || currentInput === '') return;

    const result = await calculate(
      currentOperation.num1,
      currentInput,
      currentOperation.operation
    );

    setNormalDisplay(result.toString());
    setCurrentInput('');
    setCurrentOperation(null);
  };

  const handleClear = () => {
    setCurrentInput('');
    setCurrentOperation(null);
    setNormalDisplay('');
  };

  return (
    <>
      {/* Calculator with Radio Buttons */}
      <div className="calculator">
        <h2>Calculator with Radio Buttons</h2>
        <input
          type="number"
          value={radioNum1}
          onChange={(e) => setRadioNum1(e.target.value)}
          placeholder="Enter first number"
        />
        <input
          type="number"
          value={radioNum2}
          onChange={(e) => setRadioNum2(e.target.value)}
          placeholder="Enter second number"
        />
        <div className="operations">
          <label>
            <input
              type="radio"
              name="operation"
              value="add"
              checked={radioOperation === 'add'}
              onChange={(e) => setRadioOperation(e.target.value)}
            />
            Add
          </label>
          <label>
            <input
              type="radio"
              name="operation"
              value="subtract"
              checked={radioOperation === 'subtract'}
              onChange={(e) => setRadioOperation(e.target.value)}
            />
            Subtract
          </label>
          <label>
            <input
              type="radio"
              name="operation"
              value="multiply"
              checked={radioOperation === 'multiply'}
              onChange={(e) => setRadioOperation(e.target.value)}
            />
            Multiply
          </label>
          <label>
            <input
              type="radio"
              name="operation"
              value="divide"
              checked={radioOperation === 'divide'}
              onChange={(e) => setRadioOperation(e.target.value)}
            />
            Divide
          </label>
        </div>
        <div className="buttons">
          <button onClick={handleRadioCalculate}>Calculate</button>
        </div>
        <input type="text" value={radioResult} readOnly />
      </div>

      {/* Calculator with Buttons */}
      <div className="calculator">
        <h2>Calculator with Buttons</h2>
        <input
          type="number"
          value={btnNum1}
          onChange={(e) => setBtnNum1(e.target.value)}
          placeholder="Enter first number"
        />
        <input
          type="number"
          value={btnNum2}
          onChange={(e) => setBtnNum2(e.target.value)}
          placeholder="Enter second number"
        />
        <div className="buttons">
          <button onClick={() => handleBtnCalculate('add')}>Add</button>
          <button onClick={() => handleBtnCalculate('subtract')}>Subtract</button>
          <button onClick={() => handleBtnCalculate('multiply')}>Multiply</button>
          <button onClick={() => handleBtnCalculate('divide')}>Divide</button>
        </div>
        <input type="text" value={btnResult} readOnly />
      </div>

      {/* Normal Calculator */}
      <div className="calculator">
        <h2>Normal Calculator</h2>
        <input type="text" value={normalDisplay} readOnly />
        <div className="number-pad">
          <button onClick={() => handleNumClick('7')}>7</button>
          <button onClick={() => handleNumClick('8')}>8</button>
          <button onClick={() => handleNumClick('9')}>9</button>
          <button onClick={() => handleOpClick('divide')}>÷</button>
          <button onClick={() => handleNumClick('4')}>4</button>
          <button onClick={() => handleNumClick('5')}>5</button>
          <button onClick={() => handleNumClick('6')}>6</button>
          <button onClick={() => handleOpClick('multiply')}>×</button>
          <button onClick={() => handleNumClick('1')}>1</button>
          <button onClick={() => handleNumClick('2')}>2</button>
          <button onClick={() => handleNumClick('3')}>3</button>
          <button onClick={() => handleOpClick('subtract')}>−</button>
          <button onClick={() => handleNumClick('0')}>0</button>
          <button onClick={() => handleNumClick('.')}>.</button>
          <button onClick={handleClear}>C</button>
          <button onClick={() => handleOpClick('add')}>+</button>
          <button onClick={handleNormalCalculate}>=</button>
        </div>
      </div>
    </>
  );
}

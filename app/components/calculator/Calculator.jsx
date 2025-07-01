'use client'

import React, { useState } from 'react';
import { Plus, Minus, X, Divide } from 'lucide-react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import { performBasicOperation,  calculateScientificFunction  } from '../../lib/calculatorOperations';
import "./style.css"


export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [waitingForOperand, setWaitingForOperand] = useState(true);
  const [pendingOperator, setPendingOperator] = useState(null);

  const clearAll = () => {
    setDisplay('0');
    setPendingOperator(null);
    setWaitingForOperand(true);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (operator) => {
    const operand = Number(display);

    if (pendingOperator !== null) {
      const newResult = performBasicOperation(pendingOperator, memory, operand);
      setMemory(newResult);
      setDisplay(String(newResult));
    } else {
      setMemory(operand);
    }

    setPendingOperator(operator);
    setWaitingForOperand(true);
  };

  const calculateFunction = (func) => {
    const operand = Number(display);
    const result = calculateScientificFunction(func, operand);
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-96">
      <CalculatorDisplay value={display} />

      <div className="grid grid-cols-4 gap-2">
        {/* Scientific Functions */}
        <CalculatorButton onClick={() => calculateFunction('sin')} className="btn-sci">sin</CalculatorButton>
        <CalculatorButton onClick={() => calculateFunction('cos')} className="btn-sci">cos</CalculatorButton>
        <CalculatorButton onClick={() => calculateFunction('tan')} className="btn-sci">tan</CalculatorButton>
        <CalculatorButton onClick={clearAll} className="btn-danger">AC</CalculatorButton>

        <CalculatorButton onClick={() => calculateFunction('sqrt')} className="btn-sci">√</CalculatorButton>
        <CalculatorButton onClick={() => calculateFunction('square')} className="btn-sci">x²</CalculatorButton>
        <CalculatorButton onClick={() => calculateFunction('log')} className="btn-sci">log</CalculatorButton>
        <CalculatorButton onClick={() => calculateFunction('ln')} className="btn-sci">ln</CalculatorButton>

        {/* Numbers and Basic Operations */}
        <CalculatorButton onClick={() => inputDigit('7')} className="btn">7</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('8')} className="btn">8</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('9')} className="btn">9</CalculatorButton>
        <CalculatorButton onClick={() => performOperation('÷')} className="btn-op"><Divide size={18} /></CalculatorButton>

        <CalculatorButton onClick={() => inputDigit('4')} className="btn">4</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('5')} className="btn">5</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('6')} className="btn">6</CalculatorButton>
        <CalculatorButton onClick={() => performOperation('×')} className="btn-op"><X size={18} /></CalculatorButton>

        <CalculatorButton onClick={() => inputDigit('1')} className="btn">1</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('2')} className="btn">2</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('3')} className="btn">3</CalculatorButton>
        <CalculatorButton onClick={() => performOperation('-')} className="btn-op"><Minus size={18} /></CalculatorButton>

        <CalculatorButton onClick={() => inputDigit('0')} className="btn">0</CalculatorButton>
        <CalculatorButton onClick={inputDecimal} className="btn">.</CalculatorButton>
        <CalculatorButton onClick={() => performOperation('=')} className="btn-eq">=</CalculatorButton>
        <CalculatorButton onClick={() => performOperation('+')} className="btn-op"><Plus size={18} /></CalculatorButton>
      </div>
    </div>
  );
};

 
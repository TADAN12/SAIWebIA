import React from 'react';
import { LucideIcon } from 'lucide-react';


const CalculatorButton = ({
  onClick,
  className,
  children
}) => (
  <button 
    onClick={onClick} 
    className={className}
  >
    {children}
  </button>
);

export default CalculatorButton;
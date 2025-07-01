export const performBasicOperation = (
    operator,
    currentValue,
    operand
  ) => {
    switch (operator) {
      case '+': return currentValue + operand;
      case '-': return currentValue - operand;
      case '×': return currentValue * operand;
      case '÷': return currentValue / operand;
      case 'pow': return Math.pow(currentValue, operand);
      default: return operand;
    }
  };
  
  export const calculateScientificFunction = (
    func,
    operand
  ) => {
    switch (func) {
      case 'sin': return Math.sin(operand * Math.PI / 180);
      case 'cos': return Math.cos(operand * Math.PI / 180);
      case 'tan': return Math.tan(operand * Math.PI / 180);
      case 'sqrt': return Math.sqrt(operand);
      case 'square': return operand * operand;
      case 'log': return Math.log10(operand);
      case 'ln': return Math.log(operand);
      default: return operand;
    }
  };
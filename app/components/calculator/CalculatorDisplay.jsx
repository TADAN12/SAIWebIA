import React from 'react';



const CalculatorDisplay = ({ value }) => (
  <div className="bg-gray-700 p-4 rounded-lg mb-4">
    <input
      type="text"
      className="w-full bg-transparent text-right text-white text-2xl font-mono"
      value={value}
      readOnly
    />
  </div>
);

export default CalculatorDisplay;
import React from 'react';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantityStepperProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center border border-husk-400 rounded-lg h-10 overflow-hidden">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className="w-10 h-full flex items-center justify-center text-leaf-900 hover:bg-leaf-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-body font-semibold text-lg"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        className="w-16 h-full text-center border-0 font-body font-semibold text-leaf-900 focus:outline-none tabular-nums"
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className="w-10 h-full flex items-center justify-center text-leaf-900 hover:bg-leaf-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-body font-semibold text-lg"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
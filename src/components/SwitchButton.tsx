import React from 'react';

interface SwitchButtonProps {
  onLabel?: string;
  offLabel?: string;
  initial?: boolean;
  onToggle?: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  onLabel = 'ON',
  offLabel = 'OFF',
  initial = false,
  onToggle,
}) => {
  const currentLabel = initial ? onLabel : offLabel;

  return (
    <button
      className={
        `
          relative w-20 h-10
          rounded-full
          transition-colors duration-300
          focus:outline-none hover:cursor-pointer
          ${initial ? 'bg-blue-200' : 'bg-gray-300'}
        `
      }
      onClick={onToggle}
    >
      <div
        className={
          `
            absolute top-1 left-1
            w-8 h-8
            bg-white rounded-full shadow-md
            transform transition-transform duration-300
            ${initial ? 'translate-x-10' : 'translate-x-0'}
          `
        }
      />

      <span
        className={
          `
            absolute top-1/4
            text-sm font-medium
            ${initial ? 'left-3' : 'right-3'}
          `
        }
      >
        {currentLabel}
      </span>
    </button>
  );
};

export default SwitchButton;

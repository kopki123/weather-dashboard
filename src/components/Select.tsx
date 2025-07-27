import React from 'react';

interface SelectProps {
  className?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  className = '',
  value,
  options,
  onChange,
}) => {
  return (
    <select
      className={`
          ${className}
          p-2
          border border-gray-300
          rounded-lg
          text-sm
          focus:outline-none
        `
      }
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
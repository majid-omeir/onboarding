import React from 'react';
import type { FormFieldProps } from '../types';

const FormField: React.FC<FormFieldProps> = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  help,
  disabled = false,
  autoComplete,
  options = []
}) => {
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  const baseInputStyles = `
    block w-full px-3 py-3 text-base border rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    transition-colors duration-200
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-blue-500'
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
  `;

  const renderInput = () => {
    if (type === 'select') {
      return (
        <select
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={baseInputStyles}
          aria-describedby={error ? `${fieldId}-error` : help ? `${fieldId}-help` : undefined}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          className={baseInputStyles}
          aria-describedby={error ? `${fieldId}-error` : help ? `${fieldId}-help` : undefined}
        />
      );
    }

    return (
      <input
        type={type}
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={baseInputStyles}
        aria-describedby={error ? `${fieldId}-error` : help ? `${fieldId}-help` : undefined}
      />
    );
  };

  return (
    <div className="mb-6">
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderInput()}
      
      {error && (
        <p id={`${fieldId}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      
      {help && !error && (
        <p id={`${fieldId}-help`} className="mt-2 text-sm text-gray-500">
          {help}
        </p>
      )}
    </div>
  );
};

export default FormField;
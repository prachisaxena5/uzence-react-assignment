import { useState,useMemo } from "react";
import { EyeIcon,EyeOffIcon,XIcon } from "../utils/Icons";
import type { InputFieldProps } from '../../types'; 

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onClear,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  readOnly = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useMemo(() => `input-${Math.random().toString(36).substring(2, 9)}`, []);

  const isPassword = type === 'password';
  const hasError = invalid && !!errorMessage;

  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-3 text-base',
    lg: 'py-3 px-4 text-lg',
  };

  // Variant & State Styles
  const baseClasses = 'w-full transition duration-150 ease-in-out focus:ring-4 rounded-lg peer disabled:opacity-50 disabled:cursor-not-allowed';
  
  let variantClasses = '';
  let focusRingColor = hasError ? 'focus:ring-red-200' : 'focus:ring-indigo-200';
  let borderColor = hasError ? 'border-red-500' : 'border-gray-300';
  let focusBorderColor = hasError ? 'focus:border-red-500' : 'focus:border-indigo-500';

  switch (variant) {
    case 'filled':
      variantClasses = `bg-gray-100 dark:bg-gray-700 border-0 ${focusBorderColor} ${focusRingColor}`;
      break;
    case 'ghost':
      variantClasses = `bg-transparent border-0 border-b ${borderColor} ${focusBorderColor} ${focusRingColor} focus:bg-gray-50 dark:focus:bg-gray-800`;
      break;
    case 'outlined':
    default:
      variantClasses = `bg-white dark:bg-gray-900 border ${borderColor} ${focusBorderColor} ${focusRingColor}`;
      break;
  }

  const inputClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses}`;
  const inputType = isPassword && !showPassword ? 'password' : type;

  const showClearButton = onClear && value && !disabled && !readOnly;
  const showPasswordToggle = isPassword && !disabled && !readOnly;

  return (
    <div className="flex flex-col mb-4 w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={inputClasses}
          aria-invalid={invalid}
          aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        />
        {(showClearButton || showPasswordToggle) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
            {/* Clear Button */}
            {showClearButton && (
              <button
                type="button"
                onClick={onClear}
                className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition p-1 rounded-full ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`}
                aria-label="Clear input"
              >
                <XIcon />
              </button>
            )}
            {/* Password Toggle */}
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition p-1 rounded-full"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper / Error Text */}
      {(helperText || hasError) && (
        <p
          id={hasError ? `${inputId}-error` : `${inputId}-helper`}
          className={`mt-1 text-xs ${hasError ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
        >
          {hasError ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
};
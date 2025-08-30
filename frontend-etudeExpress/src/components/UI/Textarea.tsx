import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        className={`
          input-field resize-none
          ${error ? 'border-error-300 focus:ring-error-500 focus:border-error-500' : ''}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-error-500 text-sm">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-gray-500 text-sm">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
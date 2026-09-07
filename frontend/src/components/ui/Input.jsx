import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    error,
    required = false,
    className = '',
    ...props
  },
  ref
) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-label">
          {label}

          {required && (
            <span className="required-mark">*</span>
          )}
        </label>
      )}

      <input
        ref={ref}
        className={[
          'form-input',
          error ? 'form-input--error' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />

      {error && (
        <span className="field-error">
          {error}
        </span>
      )}
    </div>
  );
});

export default Input;
import {
  forwardRef,
  useId,
} from 'react';

const Textarea = forwardRef(
  function Textarea(
    {
      label,
      error,
      required = false,
      className = '',
      maxLength,
      showCount = false,
      value = '',
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const textareaId = props.id || generatedId;

    const currentLength =
      typeof value === 'string'
        ? value.length
        : 0;

    return (
      <div className="form-field textarea-field">

        {label && (
          <label className="form-label" htmlFor={textareaId}>
            {label}

            {required && (
              <span className="required-mark">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          className={[
            'form-textarea',
            error
              ? 'form-textarea--error'
              : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          value={value}
          maxLength={maxLength}
          {...props}
        />

        <div className="textarea-footer">
          {error && (
            <span className="field-error" id={`${textareaId}-error`}>
              {error}
            </span>
          )}

          {showCount &&
            maxLength && (
              <span className="textarea-count">
                {currentLength}/{maxLength}
              </span>
            )}
        </div>
      </div>
    );
  }
);

export default Textarea;

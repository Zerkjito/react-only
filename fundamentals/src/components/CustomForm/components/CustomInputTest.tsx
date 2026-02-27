import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
}

export const CustomInputFormTest = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  error,
}: InputProps<T>) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            aria-invalid={error ? 'true' : 'false'}
            className={`control-group ${error ? 'error' : ''}`}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

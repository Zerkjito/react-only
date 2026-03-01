import {
  Controller,
  type FieldError,
  type Control,
  type Path,
  type FieldValues,
} from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
}

export const CustomInput = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  placeholder,
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
            placeholder={placeholder}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            required={true}
            aria-required={true}
          />
        )}
      />
      <p className="error">{error?.message}</p>
    </div>
  );
};

import { Controller, type FieldError, type Control } from 'react-hook-form';

interface InputProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  error?: FieldError;
}

export const CustomInputForm = ({
  name,
  control,
  label,
  type,
  error,
}: InputProps) => {
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
            className={`form-control ${error?.message ? 'is-invalid' : ''}`}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

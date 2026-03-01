import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface CheckBoxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
}

export const CustomCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  error,
}: CheckBoxProps<T>) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type="checkbox"
            checked={field.value}
            onChange={field.onChange}
            required={true}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

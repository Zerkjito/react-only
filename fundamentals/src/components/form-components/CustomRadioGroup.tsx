import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type RadioOption<TValue> = {
  label: string;
  value: TValue;
};

interface RadioGroupProps<T extends FieldValues, TName extends Path<T>> {
  name: TName;
  control: Control<T>;
  options: RadioOption<T[TName]>[];
  error?: FieldError;
  legend?: string;
}

export const CustomRadioGroup = <T extends FieldValues, TName extends Path<T>>({
  name,
  control,
  options,
  error,
  legend,
}: RadioGroupProps<T, TName>) => {
  return (
    <fieldset>
      {legend && <legend>{legend}</legend>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {options.map((option) => (
              <label key={String(option.value)}>
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  onBlur={field.onBlur}
                />
                {option.label}
              </label>
            ))}
          </>
        )}
      />

      <p className="error">{error?.message}</p>
    </fieldset>
  );
};

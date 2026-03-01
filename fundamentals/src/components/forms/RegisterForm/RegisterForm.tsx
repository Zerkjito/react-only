import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { CustomCheckbox, CustomInput } from '../../form-components';

const passwordSchema = z
  .string()
  .min(6, 'Password must at least be 6 characters long')
  .regex(/[A-Z]/, 'Password must at least have an uppercase letter')
  .regex(/[0-9]/, 'Password must at least have a number');

const userSchema = z
  .object({
    fname: z.string().min(2, 'First name must at least be 2 characters long'),
    lname: z.string().min(2, 'Last name must at least be 2 characters long'),
    email: z.string().email('Invalid email'),
    sex: z.enum(['Male', 'Female', 'Rather not say'], {
      error: 'Please select an option',
    }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    terms: z.boolean().refine((val) => val === true, {
      error: 'You must accept the terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof userSchema>;

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fname: '',
      lname: '',
      email: '',
      sex: undefined,
      password: '',
      confirmPassword: '',
      terms: false,
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        name="fname"
        control={control}
        placeholder="Name"
        error={errors.fname}
      />

      <CustomInput
        name="lname"
        control={control}
        placeholder="Last Name"
        error={errors.lname}
      />

      <CustomInput
        name="email"
        control={control}
        placeholder="Email Address"
        type="email"
        error={errors.email}
      />

      <CustomInput
        name="password"
        control={control}
        placeholder="Contraseña"
        type="password"
        error={errors.password}
      />

      <CustomInput
        name="confirmPassword"
        control={control}
        placeholder="Confirmar contraseña"
        type="password"
        error={errors.confirmPassword}
      />

      <CustomCheckbox
        name="terms"
        control={control}
        label="I accept the terms and conditions"
        error={errors.terms}
      />

      <button type="submit">Sign up</button>
    </form>
  );
};

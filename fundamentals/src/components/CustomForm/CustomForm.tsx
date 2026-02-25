import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { CustomInputForm } from './components';

const userSchema = z
  .object({
    name: z.string().min(2, 'El nombre debe tener un mínimo de 2 caracteres.'),
    email: z.string().email('Correo inválido'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'La contraseña de confirmación no coincide. Vuelve a intentarlo.',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof userSchema>;

export const CustomForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputForm
        name="name"
        control={control}
        label="name"
        type="text"
        error={errors.name}
      />
    </form>
  );
};

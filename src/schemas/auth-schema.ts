import { z } from 'zod';

export const registerSchema = z.object({
  username: z
  .string()
  .nonempty('Nome de usuário é obrigatório.')
  .min(3, 'Nome de usuário deve conter no mínimo 3 caracteres.')
  .max(16, 'Nome de usuário deve conter no máximo 16 caracteres.'),

  firstname: z
  .string()
  .nonempty('Nome é obrigatório.')
  .min(3, 'Nome deve conter no mínimo 3 caracteres.')
  .max(16, 'Nome deve conter no máximo 16 caracteres.'),

  lastname: z.string()
  .max(16, 'Sobrenome deve conter no máximo 16 caracteres.')
  .optional(),

  email: z
  .string()
  .nonempty('Email é obrigatório.')
  .email('Email inválido.'),

  password: z
  .string()
  .nonempty('Senha é obrigatória')
  .min(6, 'Senha deve conter no mínimo 6 caracteres.')
  .max(20, 'Senha deve conter no máximo 20 caracteres.')

}).strip();

export const loginSchema = registerSchema.pick({
  email: true,
  password: true
}).strip();
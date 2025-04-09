import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { loginSchema, registerSchema } from '../schemas/auth-schema';
import AuthService from '../services/auth.services';

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;

const AuthController = {
    register: async (
        request: FastifyRequest<{ Body: RegisterBody }>,
        reply: FastifyReply,
    ): Promise<void> => {
        const parse = await registerSchema.safeParseAsync(request.body);
        const userRequestBody = request.body;

        if (!parse.success) {
            return reply.code(400).send({
                message: 'Dados inválidos.',
                errors: parse.error.flatten().fieldErrors,
            });
        }

        const user = await AuthService.createUser(userRequestBody);

        if (!user) {
            return reply.code(400).send({ message: 'Erro ao cadastrar usuário!'});
        }

        return reply.code(201).send({
            message: 'Conta criada com sucesso!',
        });
        
    },
    login: async (
        request: FastifyRequest<{ Body: LoginBody }>,
        reply: FastifyReply,
    ): Promise<void> => {
        const user = request.body;

        const parse = await loginSchema.safeParseAsync(request.body);

        if (!parse.success) {
            return reply.code(400).send({
                message: 'Dados inválidos!',
                errors: parse.error.flatten().fieldErrors,
            });
        }

        const token = await AuthService.login(user.email, user.password);

        if (!token) {
            return reply.code(400).send(
                { message: 'Houve erro ao retornar ao tentar fazer login!' }
            );
        }

        return reply.code(200).send(
            { message: 'Login feito com sucesso!', token: token }
        );
    },
};

export default AuthController;

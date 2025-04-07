import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterInput } from '../schemas/auth-schema';
import AuthService from '../services/auth.services';

type RegisterBody = z.infer<typeof RegisterInput>;

const AuthController = {
    register: async (
        request: FastifyRequest<{ Body: RegisterBody }>,
        reply: FastifyReply,
    ): Promise<void> => {
        const parse = RegisterInput.safeParse(request.body);

        if (!parse.success) {
            return reply.code(400).send({
                message: 'Error de validação',
                errors: parse.error.flatten().fieldErrors,
            });
        };

        const userRequestBody = request.body;
        const user = await AuthService.createUser(userRequestBody);        

        return reply.code(201).send({
            message: 'Usuário criado com sucesso',
            user,
        });
    },
};

export default AuthController;

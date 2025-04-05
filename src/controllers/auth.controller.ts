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
        try {
            const parse = RegisterInput.safeParse(request.body);

            const { username, email, firstname, lastname, password } = request.body;
            if (!parse.success) {
                return reply.code(400).send({
                    message: 'Error de validação',
                    errors: parse.error.flatten().fieldErrors,
                });
            }

            const hasUserWithUniqueCredential = await AuthService
            .validateUniqueUserCredentials({
                    email: email,
                    username: username,
            })

            if(hasUserWithUniqueCredential) {
              throw new Error('Existe um usuário com as credenciais únicas')
            } 

            const newUser = await AuthService.createUser({
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: password
            })

            reply.code(201).send({
              message: 'Usuário criado com sucesso', newUser
            })
        } catch (err) {
            console.log(err);
        }
    },
};

export default AuthController;

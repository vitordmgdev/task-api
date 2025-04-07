import { 
    FastifyError, 
    FastifyReply, 
    FastifyRequest 
} from 'fastify';
import { AppError } from './app.error';

export const ErrorHandle = (
    err: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    console.error(err.stack);
    console.error(err);

    if (err instanceof AppError) {
        return reply.status(err.statusCode).send({
            err: err.message,
        });
    }
};

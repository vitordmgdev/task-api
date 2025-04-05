import { FastifyInstance } from 'fastify';
import AuthController from '../controllers/auth.controller';

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', AuthController.register);

  app.post('/login', (request, reply) => {
    reply.send('Hello world!');
  });
}
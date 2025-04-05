import fastify from 'fastify';
import { userRoutes } from './routes/auth.routes';

const app = fastify();

app.register(userRoutes, { prefix: '/auth' });

app.listen({ port: 3333 }, () => {
  console.log('🚀 Server is running on http://localhost:3333');
});

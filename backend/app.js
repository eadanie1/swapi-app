
import { routesLocal } from './src/scripts/local-characters.js';
import { addCharacterRoute } from './src/scripts/add-character.js';
import { moveRoute } from './src/scripts/move-character.js';
import deletionHandler from './src/scripts/delete-character.js';
import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: true
});

fastify.register(cors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
});

// fastify.options('*', (request, reply) => {
//   reply.header('Access-Control-Allow-Origin', '*');
//   reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   reply.send();
// });

fastify.addHook('onSend', (request, reply, payload, done) => {
  console.log(reply.getHeaders());
  done();
});

export const collection = [
  {id: 1, 
    name: 'Yoda'},
  {id: 2, 
  name: 'Princess Leia'},
  {id: 3, 
  name: 'Obi-Wan Kenobi'},
  {id: 4, 
  name: 'R2-D2'},
];

routesLocal.forEach(route => {
  fastify.get(route.path, route.handler);
});


addCharacterRoute.forEach(route => {
  fastify.post(route.path, route.handler)
});


moveRoute.forEach(route => {
  fastify.patch(route.path, route.handler);
});


deletionHandler.deletionRoute.forEach(route => {
  fastify.delete(route.path, route.handler);
});

const port = process.env.PORT || 3000;
fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Listening on port ${port}...`)
});

export default {collection}
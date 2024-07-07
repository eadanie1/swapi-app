
import { collection } from '../../app.js';

export async function validateDeletion(collection, request, reply) {
  const index = collection.findIndex(c => c.id === parseInt(request.params.id));
  
  if (index !== -1) {
    collection.splice(index, 1);
    return reply.send(collection);
  } else {
    return reply.status(404).send({error: 'Character not found in the collection'});
  } 
}

export const deletionRoute = [
  {
    path: '/api/people/delete-character/:id',
    handler: async (request, reply) => {
      try {
        await validateDeletion(collection, request, reply);
      }
      catch (error) {
        console.error('Error', error.message);
      }
    }
  }
];

export default { validateDeletion, deletionRoute };
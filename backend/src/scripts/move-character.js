
import { collection } from "../../app.js";


export async function moveValidation(collection, request, reply) {
  const index1 = collection.findIndex(c => c.id === parseInt(request.params.id1));
  const index2 = collection.findIndex(c => c.id === parseInt(request.params.id2));
  
  if (index1 === -1 || index2 === -1) {
    return reply.status(404).send({error: 'One or both of the characters were not found in the collection'});
  }
  return ({index1, index2});
}

export async function moveCharacters(collection, validatedMove, request, reply) {
  [collection[validatedMove.index1], collection[validatedMove.index2]] = [collection[validatedMove.index2], collection[validatedMove.index1]];
  return reply.send(collection);
}


export const moveRoute = [
  {
    path: '/api/people/swap/:id1/:id2',
    handler: async (request, reply) => {
      try {
        const validatedMove = await moveValidation(collection, request, reply);
    
        await moveCharacters(collection, validatedMove, request, reply);
      }
      catch (error) {
        console.error('Error', error.message);
        return;
      }
    }
  }
];

export default { moveValidation, moveCharacters, moveRoute };
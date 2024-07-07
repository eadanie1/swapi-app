
import { collection } from '../../app.js';

export async function getFullCollectionLocally() {
  return collection;
}

export async function getIndividualCharacterLocally(request, reply) {
  const character = collection.find(c => c.id === parseInt(request.params.id));
  if (!character) {
    return reply.status(404).send({error: 'No character exists with the given ID'});
  }
  return character;
}


export const routesLocal = [
  {
    path: '/api/people/',
    handler: async (request, reply) => {
      try {
        const fullListOfCharacters = await getFullCollectionLocally();
        return reply.send(fullListOfCharacters);
      } catch (err) {
        console.error('Error reading file', err.message);
        return reply.status(500).send({ error: 'Internal Server Error'});
      }
    }
  },
  {
    path: '/api/people/:id',
    handler: async (request, reply) => {
      try {
        const singleCharacter = await getIndividualCharacterLocally(request, reply);
        if (singleCharacter) {
          return reply.send(singleCharacter);
        }
      } catch (err) {
        console.error('Error reading file', err.message);
        return;
      }
    }
  }
];

export default { routesLocal };
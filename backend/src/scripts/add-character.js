
import axios from 'axios';
import { collection } from '../../app.js';
import fastify from 'fastify';

export async function validateInput(request, reply) {
  let character = request.body.name;

  if (!character || !(typeof character === 'string')) {
    return reply.status(400).send({error: 'A valid string character name is required'});
  }
  
  let characterAlreadyInCollection = collection.find(c => c.name.toLowerCase() === character.toLowerCase());

  if (characterAlreadyInCollection) {
    return reply.status(401).send({message: 'The character already exists in the collection'});
  }

  return character;
}

export async function characterNotFound(swapiResponse, reply) {
  return swapiResponse.data.count === 0;
}

export async function addCharacter(characterObject, validatedCharacterInput, request, reply) {
  collection.push(characterObject);
  return reply.send(characterObject);
}

export const addCharacterRoute = [
  {path: '/api/people/add-character',
  handler: async (request, reply) => {
    try {
      const validatedCharacterInput = await validateInput(request, reply);
      
      const swapiUrl = `https://swapi.dev/api/people/?search=${validatedCharacterInput}`;
      const swapiResponse = await axios.get(swapiUrl);
      
      if (await characterNotFound(swapiResponse, reply)) {
        return reply.status(404).send({error: 'The character does not exist in the SWAPI database'})
      }

      let nextId = 1;

      while (collection.some(character => character.id === nextId)) {
        nextId++;
      }
      
      const characterObject = {
        id: nextId,
        name: swapiResponse.data.results[0].name
      };
  
      await addCharacter(characterObject, validatedCharacterInput, request, reply);
    }
    catch (err) {
      fastify.log.error('Error', err.messsage);
      return;
    }
  }}
];


export default { validateInput, characterNotFound, addCharacter, addCharacterRoute };
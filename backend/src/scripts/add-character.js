
import axios from 'axios';
import { collection } from '../../app.js';

export async function validateInput(req, res) {
  let character = req.body.name;

  if (!character || !(typeof character === 'string')) {
    return res.status(400).json({error: 'A valid string character name is required'});
  }
  
  let characterAlreadyInCollection = collection.find(c => c.name.toLowerCase() === character.toLowerCase());

  if (characterAlreadyInCollection) {
    return res.status(401).json({message: 'The character already exists in the collection'});
  }

  return character;
}

export async function characterNotFound(swapiResponse, res) {
  return swapiResponse.data.count === 0;
}

export async function addCharacter(characterObject, validatedCharacterInput, req, res) {
  collection.push(characterObject);
  return res.json(characterObject);
}

export const addCharacterRoute = [
  {path: '/api/people/add-character',
  handler: async (req, res) => {
    try {
      const validatedCharacterInput = await validateInput(req, res);
      
      const swapiUrl = `https://swapi.dev/api/people/?search=${validatedCharacterInput}`;
      const swapiResponse = await axios.get(swapiUrl);
      
      if (await characterNotFound(swapiResponse, res)) {
        return res.status(404).json({error: 'The character does not exist in the SWAPI database'})
      }

      let nextId = 1;

      while (collection.some(character => character.id === nextId)) {
        nextId++;
      }
      
      const characterObject = {
        id: nextId,
        name: swapiResponse.data.results[0].name
      };
  
      await addCharacter(characterObject, validatedCharacterInput, req, res);
    }
    catch (err) {
      console.error('Error', err.messsage);
      return;
    }
  }}
];


export default { validateInput, characterNotFound, addCharacter, addCharacterRoute };
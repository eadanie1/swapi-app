
import { collection } from '../../app.js';

export async function getFullCollectionLocally() {
  return collection;
}

export async function getIndividualCharacterLocally(req, res) {
  const character = collection.find(c => c.id === parseInt(req.params.id));
  if (!character) {
    return res.status(404).json({error: 'No character exists with the given ID'});
  }
  return character;
}


export const routesLocal = [
  {
    path: '/api/people/',
    handler: async (req, res) => {
      try {
        const fullListOfCharacters = await getFullCollectionLocally();
        return res.json(fullListOfCharacters);
      } catch (err) {
        console.error('Error reading file', err.message);
        return res.status(500).json({ error: 'Internal Server Error'});
      }
    }
  },
  {
    path: '/api/people/:id',
    handler: async (req, res) => {
      try {
        const singleCharacter = await getIndividualCharacterLocally(req, res);
        if (singleCharacter) {
          return res.json(singleCharacter);
        }
      } catch (err) {
        console.error('Error reading file', err.message);
        return;
      }
    }
  }
];

export default { routesLocal };
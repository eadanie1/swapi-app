
import { collection } from "../../app.js";


export async function moveValidation(collection, req, res) {
  const index1 = collection.findIndex(c => c.id === parseInt(req.params.id1));
  const index2 = collection.findIndex(c => c.id === parseInt(req.params.id2));
  
  if (index1 === -1 || index2 === -1) {
    return res.status(404).json({error: 'One or both of the characters were not found in the collection'});
  }
  return ({index1, index2});
}

export async function moveCharacters(collection, validatedMove, req, res) {
  [collection[validatedMove.index1], collection[validatedMove.index2]] = [collection[validatedMove.index2], collection[validatedMove.index1]];
  // res.json({message: `${collection[1].name} and ${collection[0].name} have been successfully swapped`});
  return res.json(collection);
}


export const moveRoute = [
  {
    path: '/api/people/swap/:id1/:id2',
    handler: async (req, res) => {
      try {
        const validatedMove = await moveValidation(collection, req, res);
    
        await moveCharacters(collection, validatedMove, req, res);
      }
      catch (error) {
        console.error('Error', error.message);
        return;
      }
    }
  }
];

export default { moveValidation, moveCharacters, moveRoute };
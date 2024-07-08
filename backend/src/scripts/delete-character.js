
import { collection } from '../../app.js';

export async function validateDeletion(collection, req, res) {
  const index = collection.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index !== -1) {
    collection.splice(index, 1);
    return res.json(collection);
  } else {
    return res.status(404).json({error: 'Character not found in the collection'});
  } 
}

export const deletionRoute = [
  {
    path: '/api/people/delete-character/:id',
    handler: async (req, res) => {
      try {
        await validateDeletion(collection, req, res);
      }
      catch (error) {
        console.error('Error', error.message);
      }
    }
  }
];

export default { validateDeletion, deletionRoute };
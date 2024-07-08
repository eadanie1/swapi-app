
import express from 'express';
import cors from 'cors';
import { routesLocal } from './src/scripts/local-characters.js';
import { addCharacterRoute } from './src/scripts/add-character.js';
import { moveRoute } from './src/scripts/move-character.js';
import deletionHandler from './src/scripts/delete-character.js';
const app = express();

app.use(express.json());
app.use(cors());

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
  app.get(route.path, route.handler);
});


addCharacterRoute.forEach(route => {
  app.post(route.path, route.handler)
});


moveRoute.forEach(route => {
  app.patch(route.path, route.handler);
});


deletionHandler.deletionRoute.forEach(route => {
  app.delete(route.path, route.handler);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});

export default {collection}
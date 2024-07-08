import axios, { AxiosError, CanceledError } from "axios";

export default axios.create({
  // baseURL: 'https://swapi-app-production.up.railway.app/api/people'
  baseURL: 'https://swapi-app-production.up.railway.app'
});

export { AxiosError, CanceledError };

async function fetchPeople() {
  try {
    const response = await axios.get('/api/people');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching people:', error);
  }
}

fetchPeople();
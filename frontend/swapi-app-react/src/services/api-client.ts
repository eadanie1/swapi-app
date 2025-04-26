import axios, { AxiosError, CanceledError } from "axios";

export default axios.create({
  baseURL: 'https://swapi-app-02a7.onrender.com/api/people'
});

export { AxiosError, CanceledError };

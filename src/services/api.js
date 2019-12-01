import { URL_API } from 'react-native-dotenv';
import axios from 'axios';

const api = axios.create({
  baseURL: `${URL_API}`,
});

export default api;

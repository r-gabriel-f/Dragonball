import axios from 'axios';


const instance = axios.create({
  baseURL: (import.meta as any).env.VITE_APP_URL_DEV, 
});
export default instance;
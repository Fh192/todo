import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    'API-KEY': 'a3f656c8-219b-497c-b91e-7723447501cd',
  },
  withCredentials: true,
});

export default instance;

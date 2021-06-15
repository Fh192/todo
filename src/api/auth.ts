import { AuthResponse } from './../types/authTypes';
import instance from './instance';

export const me = async () => {
  const response = await instance.get<AuthResponse>('auth/me');
  return response.data;
};

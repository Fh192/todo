import {
  AuthResponse,
  LoginFormData,
  LoginResponse,
  LogoutResponse,
} from './../types/authTypes';
import instance from './instance';

export const auth = {
  me: async () => {
    const response = await instance.get<AuthResponse>('auth/me');
    return response.data;
  },

  login: async (loginFormData: LoginFormData) => {
    const response = await instance.post<LoginResponse>('auth/login', {
      ...loginFormData,
    });
    return response.data;
  },

  logout: async () => {
    const response = await instance.delete<LogoutResponse>('auth/login');
    return response.data;
  },

  captchaURL: async () => {
    const response = await instance.get('security/get-captcha-url');
    console.log(response);
    return response.data.url;
  },
};

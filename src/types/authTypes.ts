export interface AuthResponse {
  resultCode: number;
  messages: Array<string>;
  data: {
    id: number | null;
    email: string;
    login: string;
  };
}

export interface AuthData {
  id: number | null;
  email: string;
  login: string;
}

export interface LoginResponse {
  resultCode: number;
  messages: Array<string>;
  data: { userId: number };
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
}

export interface LogoutResponse {
  resultCode: number;
  messages: Array<string>;
  data: {};
}

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

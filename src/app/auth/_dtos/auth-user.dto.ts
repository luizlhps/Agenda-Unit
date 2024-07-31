export interface AuthUser {
  email: string;
  role: string;
  exp: number;
  iss: string;
  aud: string;
}

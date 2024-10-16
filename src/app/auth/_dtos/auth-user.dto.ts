export interface AuthUser {
  username: string;
  role: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: Array<string>;
}
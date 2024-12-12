// user.model.ts
export interface User {
  id: number | undefined;
  username: string | undefined;
  token: string;
  roles: string[] | undefined;
}

export type LoginUser = {
  email: string;
  password: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  role: 'Admin' | 'User';
};

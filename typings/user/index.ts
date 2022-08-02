interface TUser {
  username: string;
  password: string;
  privileges?: 0 | 1 | 2 | 3;
  avatar?: string | null;
  create_time?: number;
  update_time?: number;
}

export { TUser };

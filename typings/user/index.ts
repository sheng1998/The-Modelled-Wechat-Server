interface TUser {
  username: string;
  password: string;
  avatar?: string | null;
  create_time?: number;
  update_time?: number;
}

export { TUser };

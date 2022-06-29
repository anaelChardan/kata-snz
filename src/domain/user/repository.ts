import { User } from "./type";

export interface UserRepository {
  findOneByUsername: (username: string) => Promise<User | undefined>;
}
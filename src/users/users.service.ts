import { Injectable } from '@nestjs/common';
import User from './models/user.model';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      email: 'test1@test.com',
      password: 'changeme',
      role: 'admin',
    },
    {
      id: '2',
      email: 'test2@test.com',
      password: 'guess',
      role: 'client',
    },
  ];

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
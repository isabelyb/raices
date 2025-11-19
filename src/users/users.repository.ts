import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUserByUuid(uuid: string) {
    return await this.findOne({
      where: { uuid },
      relations: ['favorites', 'credential'],
    });
  }

  async getUserByEmail(email: string) {
    return await this.findOne({
      where: { email },
    });
  }

  async getUserById(uuid: string) {
    return await this.findOne({
      where: { uuid },
      relations: ['favorites', 'credential'],
    });
  }

  async createUser(userData: Partial<User>) {
    const user = this.create(userData);
    return await this.save(user);
  }

  async softDeleteRepository(user: User) {
    user.isActive = false;
    await this.save(user);
    return { message: 'Usuario desactivado exitosamente' };
  }
}
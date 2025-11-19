import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './Dto/create-user.dto';
import { UpdateUserDto } from './Dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Legends } from '../entities/legends.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,

    @InjectRepository(Legends)
    private readonly legendsRepo: Repository<Legends>,
  ) {}

  // CREATE
  async create(dto: CreateUserDto) {
    const existingUser = await this.usersRepo.getUserByEmail(dto.email.trim().toLowerCase());
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }
    const user = this.usersRepo.create(dto);
    return await this.usersRepo.save(user);
  }

  // FIND ALL
  async findAll() {
    return await this.usersRepo.find();
  }

  // FIND ONE
  async findOne(uuid: string) {
    const user = await this.usersRepo.findUserByUuid(uuid);
    if (!user) throw new NotFoundException(`User with id ${uuid} not found`);
    return user;
  }

  // UPDATE
  async update(uuid: string, dto: UpdateUserDto) {
    const user = await this.findOne(uuid);

    // Validar que el email no esté en uso por otro usuario (solo si el email cambió)
    if (dto.email) {
      const newEmail = dto.email.trim().toLowerCase();
      const currentEmail = (user.email || '').trim().toLowerCase();

      // Solo validar si el email realmente cambió
      if (newEmail !== currentEmail) {
        const existingUser = await this.usersRepo.getUserByEmail(dto.email.trim().toLowerCase());
        // Si existe otro usuario con ese email (no el actual), lanzar error
        if (existingUser && existingUser.uuid !== user.uuid) {
          throw new ConflictException('El email ya está registrado');
        }
      }
      // Si el email es el mismo, no hacer nada (permitir actualizar otros campos)
    }

    Object.assign(user, dto);
    return await this.usersRepo.save(user);
  }

  // SOFT DELETE
  async softDelete(uuid: string) {
    const user = await this.findOne(uuid);
    if (!user.isActive) {
      throw new ConflictException('El usuario ya está desactivado');
    }
    return this.usersRepo.softDeleteRepository(user);
  }

  // FAVORITES - GET
  async getFavorites(uuid: string) {
    const user = await this.findOne(uuid);
    return user.favorites;
  }

  // FAVORITES - ADD
  async addFavorite(uuid: string, legendId: string) {
    const user = await this.findOne(uuid);

    const legend = await this.legendsRepo.findOne({
      where: { uuid: legendId },
    });

    if (!legend) throw new NotFoundException('Legend not found');

    user.favorites.push(legend);
    return await this.usersRepo.save(user);
  }

  // FAVORITES - REMOVE
  async removeFavorite(uuid: string, legendId: string) {
    const user = await this.findOne(uuid);

    user.favorites = user.favorites.filter(f => f.uuid !== legendId);

    await this.usersRepo.save(user);
    return { message: 'Favorite removed successfully' };
  }
}
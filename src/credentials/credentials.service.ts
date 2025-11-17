import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { createCredentialsDto } from './Dtos/createCredentials.dto';
import { UpdateCredentialsDto } from './Dtos/updateCredentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  // Crear credenciales
  async createCredentials(createDto: createCredentialsDto) {
    const usernameExists = await this.credentialsRepository.usernameExists(createDto.username);
    if (usernameExists) {
      throw new ConflictException('Ya existe un usuario con este nombre de usuario');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    return this.credentialsRepository.create({
      ...createDto,
      password: hashedPassword,
    });
  }

  // Actualizar credenciales
  async updateCredentials(uuid: string, updateDto: UpdateCredentialsDto) {
    const existing = await this.credentialsRepository.getById(uuid);
    if (!existing) throw new NotFoundException('Credenciales no encontradas');

    if (updateDto.password) {
      updateDto.password = await bcrypt.hash(updateDto.password, 10);
    }

    return this.credentialsRepository.update(uuid, updateDto);
  }

  async deleteCredentials(uuid: string) {
    const existing = await this.credentialsRepository.getById(uuid);
    if (!existing) throw new NotFoundException('Credenciales no encontradas');
    if (!existing.isActive) throw new BadRequestException('Ya están desactivadas');

    return this.credentialsRepository.softDelete(uuid);
  }

  async reactivateCredentials(uuid: string) {
    const existing = await this.credentialsRepository.getById(uuid);
    if (!existing) throw new NotFoundException('Credenciales no encontradas');

    return this.credentialsRepository.reactivate(uuid);
  }

  async verifyCredentials(username: string, password: string) {
    const credentials = await this.credentialsRepository.getByUsername(username);
    if (!credentials) return null;

    const valid = await bcrypt.compare(password, credentials.password);
    if (!valid) return null;

    return credentials;
  }
}

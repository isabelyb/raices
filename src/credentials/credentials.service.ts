import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { createCredentialsDto } from './Dtos/createCredentials.dto';
import { UpdateCredentialsDto } from './Dtos/updateCredentials.dto';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly credentialsRepository: CredentialsRepository
  ) {}

  async createCredentialsServices(createCredentialsDto: createCredentialsDto) {
    const usernameExists = await this.credentialsRepository.usernameExists(createCredentialsDto.username);

    if (usernameExists) {
      throw new ConflictException('Ya existen credenciales registradas con este nombre de usuario');
    }

    return this.credentialsRepository.create(createCredentialsDto);
  }

  async updateCredentialsService(uuid: string, updateCredencialesDto: UpdateCredentialsDto) {
    const credentialsExisting = await this.credentialsRepository.getById(uuid);
    if (!credentialsExisting) throw new NotFoundException('Estas credenciales no existen');

    return this.credentialsRepository.update(uuid, updateCredencialesDto);
  }

  async deleteCredentialsService(uuid: string) {
    const credentialsExisting = await this.credentialsRepository.getById(uuid);
    if (!credentialsExisting) throw new NotFoundException('Estas credenciales no existen');
    if (!credentialsExisting.isActive) throw new BadRequestException('Estas credenciales ya están desactivadas');

    return this.credentialsRepository.softDelete(uuid);
  }

  async reactivateCredentialsService(uuid: string) {
    const credentialsExisting = await this.credentialsRepository.getById(uuid);
    if (!credentialsExisting) throw new NotFoundException('Estas credenciales no existen');

    return this.credentialsRepository.reactivate(uuid);
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CredentialsEntity } from "src/entities/credential.entity";
import { Repository } from "typeorm";

@Injectable()
export class CredentialsRepository {
  constructor(
    @InjectRepository(CredentialsEntity)
    private readonly credentialsRepo: Repository<CredentialsEntity>,
  ) {}

  async getAll(): Promise<CredentialsEntity[]> {
    return this.credentialsRepo.find({ where: { isActive: true }, relations: ['user'], order: { createAt: 'ASC' } });
  }

  async getById(uuid: string): Promise<CredentialsEntity | null> {
    return this.credentialsRepo.findOne({ where: { uuid }, relations: ['user'] });
  }

  async getByUsername(username: string): Promise<CredentialsEntity | null> {
    return this.credentialsRepo.findOne({ where: { username, isActive: true }, relations: ['user'] });
  }

  async usernameExists(username: string): Promise<boolean> {
    const count = await this.credentialsRepo.count({ where: { username } });
    return count > 0;
  }

  async create(createDto: Partial<CredentialsEntity>): Promise<CredentialsEntity> {
    const credentials = this.credentialsRepo.create(createDto);
    return this.credentialsRepo.save(credentials);
  }

  async update(uuid: string, updateDto: Partial<CredentialsEntity>): Promise<CredentialsEntity> {
    const credentials = await this.getById(uuid);
    if (!credentials) throw new NotFoundException('Credenciales no encontradas');

    Object.assign(credentials, updateDto);
    return this.credentialsRepo.save(credentials);
  }

async softDelete(uuid: string): Promise<CredentialsEntity> {
  const credentials = await this.getById(uuid);
  if (!credentials) throw new NotFoundException('Credenciales no encontradas');

  credentials.isActive = false;
  return this.credentialsRepo.save(credentials);
}

async reactivate(uuid: string): Promise<CredentialsEntity> {
  const credentials = await this.getById(uuid);
  if (!credentials) throw new NotFoundException('Credenciales no encontradas');

  credentials.isActive = true;
  return this.credentialsRepo.save(credentials);
}

}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CredentialsEntity } from "src/entities/credential.entity";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { createCredentialsDto } from "./Dtos/createCredentials.dto";
import { UpdateCredentialsDto } from "./Dtos/updateCredentials.dto";
import { Role } from "src/enums/roles.enum";

@Injectable()
export class CredentialsRepository {
  constructor(
    @InjectRepository(CredentialsEntity)
    private readonly credentialsRepo: Repository<CredentialsEntity>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Obtener todas las credenciales activas
  async getAll(): Promise<CredentialsEntity[]> {
    return await this.credentialsRepo.find({
      where: { isActive: true },
      relations: ["user"],
      order: { createAt: "ASC" },
    });
  }

  // Obtener credenciales por UUID
  async getById(uuid: string): Promise<CredentialsEntity | null> {
    return await this.credentialsRepo.findOne({
      where: { uuid },
      relations: ["user"],
    });
  }

  // Verificar si el username ya existe
  async usernameExists(username: string): Promise<boolean> {
    const count = await this.credentialsRepo.count({ where: { username } });
    return count > 0;
  }

  // Crear nuevas credenciales
  async create(createDto: createCredentialsDto): Promise<CredentialsEntity> {
    if (!createDto.username || !createDto.password || !createDto.user_id) {
      throw new Error("Faltan campos obligatorios");
    }

    if (await this.usernameExists(createDto.username)) {
      throw new Error("El nombre de usuario ya está en uso");
    }

    const user = await this.userRepo.findOne({ where: { uuid: createDto.user_id } });
    if (!user) throw new NotFoundException("Usuario no encontrado");

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    const credentials = this.credentialsRepo.create({
      username: createDto.username,
      password: hashedPassword,
      role: createDto.role || Role.USER,
      isActive: createDto.isActive ?? true,
      user,
      createAt: new Date(),
    });

    await this.credentialsRepo.save(credentials);
    return credentials;
  }

  // Actualizar credenciales
  async update(uuid: string, updateDto: UpdateCredentialsDto): Promise<CredentialsEntity> {
    const credentials = await this.getById(uuid);
    if (!credentials) throw new NotFoundException("Credenciales no encontradas");

    if (updateDto.username) credentials.username = updateDto.username;
    if (updateDto.password) credentials.password = await bcrypt.hash(updateDto.password, 10);
    if (updateDto.role) credentials.role = updateDto.role;
    if (updateDto.isActive !== undefined) credentials.isActive = updateDto.isActive;

    await this.credentialsRepo.save(credentials);
    return credentials;
  }

  // Soft delete (desactivar)
  async softDelete(uuid: string): Promise<CredentialsEntity> {
    const credentials = await this.getById(uuid);
    if (!credentials) throw new NotFoundException("Credenciales no encontradas");

    credentials.isActive = false;
    await this.credentialsRepo.save(credentials);
    return credentials;
  }

  // Reactivar credenciales
  async reactivate(uuid: string): Promise<CredentialsEntity> {
    const credentials = await this.getById(uuid);
    if (!credentials) throw new NotFoundException("Credenciales no encontradas");

    credentials.isActive = true;
    await this.credentialsRepo.save(credentials);
    return credentials;
  }

  // Verificar login
  async verifyCredentials(username: string, password: string): Promise<CredentialsEntity | null> {
    const credentials = await this.credentialsRepo.findOne({
      where: { username, isActive: true },
      relations: ["user"],
    });

    if (!credentials) return null;

    const valid = await bcrypt.compare(password, credentials.password);
    if (!valid) return null;

    return credentials;
  }
}

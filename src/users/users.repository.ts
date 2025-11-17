import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credential.entity';
import { CreateUserDto } from './Dto/create-user.dto';

@Injectable()
export class UsersRepository extends Repository<User> {

  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(CredentialsEntity)
    private readonly credentialDataBase: Repository<CredentialsEntity>,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async findUserByUuid(uuid: string) {
    return await this.findOne({
      where: { uuid },
      relations: ['favorites'],
    });
  }

  async postCreateUserRepository(createUserDto: CreateUserDto) {

    //  Crear credenciales
    const newCredentials = this.credentialDataBase.create({
      username: createUserDto.username,
      password: createUserDto.password,
    });

    await this.credentialDataBase.save(newCredentials);

    //  Crear usuario
    const newUser = this.create({
      name: createUserDto.name,
      lastname: createUserDto.lastname,
      phone: createUserDto.phone,
      email: createUserDto.email,
      location: createUserDto.location,

      // Relación
      credential: newCredentials,
    });

    await this.save(newUser);

    return newUser;
  }
}

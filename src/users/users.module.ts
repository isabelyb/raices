import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entities/users.entity';
import { UsersRepository } from './users.repository';
import { Legends } from '../entities/legends.entity';
import { CredentialsEntity } from 'src/entities/credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Legends, CredentialsEntity])],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
})
export class UsersModule {}

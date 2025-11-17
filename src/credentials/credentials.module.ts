import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';

import { CredentialsController } from './credentials.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credential.entity';
import { CredentialsRepository } from './credentials.repository';
import { User } from 'src/entities/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialsEntity,User]), UsersModule],
  providers: [CredentialsService, CredentialsRepository],
  controllers: [CredentialsController, CredentialsRepository],
  exports:[TypeOrmModule, CredentialsService, CredentialsRepository]
})
export class CredentialsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entities/users.entity';
import { UsersRepository } from './users.repository';
import { Legends } from '../entities/legends.entity';
import { LegendsModule } from '../legends/legends.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Legends]),
    LegendsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
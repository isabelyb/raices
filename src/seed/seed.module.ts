import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Categories } from 'src/entities/categories.entity';
import { Locations } from 'src/entities/locations.entity';
import { Legends } from 'src/entities/legends.entity';
import { User } from 'src/entities/users.entity';
import { CredentialsEntity } from 'src/entities/credential.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Categories,
      Locations,
      Legends,
      User,
      CredentialsEntity,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}

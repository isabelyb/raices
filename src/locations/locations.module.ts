import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationsRepository } from './locations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from 'src/entities/locations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Locations])],
  providers: [LocationsService, LocationsRepository],
  controllers: [LocationsController],
  exports: [LocationsService, LocationsRepository],
})
export class LocationsModule {}

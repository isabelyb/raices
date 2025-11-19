import { Module } from '@nestjs/common';
import { LegendsController } from './legends.controller';
import { LegendsService } from './legends.service';
import {LegendsRepository} from "./legends.repository";
import { TypeOrmModule } from '@nestjs/typeorm';
import {Legends} from '../entities/legends.entity';
import { Categories } from '../entities/categories.entity';
import { Locations } from '../entities/locations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Legends, Categories, Locations])],
  controllers: [LegendsController],
  providers: [LegendsService, LegendsRepository],
  exports: [TypeOrmModule, LegendsService, LegendsRepository],
})
export class LegendsModule {}

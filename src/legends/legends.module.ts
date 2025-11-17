import { Module } from '@nestjs/common';
import { LegendsController } from './legends.controller';
import { LegendsService } from './legends.service';
import {LegendsRepository} from "./legends.repository";
import { TypeOrmModule } from '@nestjs/typeorm';
import {Legends} from '../entities/legends.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Legends])],
  controllers: [LegendsController],
  providers: [LegendsService, LegendsRepository]
})
export class LegendsModule {}

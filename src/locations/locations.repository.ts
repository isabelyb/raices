import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Locations } from 'src/entities/locations.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './Dtos/createLocation.dto';
import { UpdateLocationDto } from './Dtos/updateLocation.dto';

@Injectable()
export class LocationsRepository {
  constructor(
    @InjectRepository(Locations)
    private readonly locationDataBase: Repository<Locations>,
  ) {}

  async findAllRepository() {
    return await this.locationDataBase.find();
  }

  async findByIdRepository(id: string) {
    return await this.locationDataBase.findOne({
      where: { uuid: id },
      relations: ['legends'],
    });
  }

  async findByNameRepository(name: string) {
    return await this.locationDataBase.findOne({
      where: { name: name },
    });
  }

  async createLocationRepository(createLocationDto: CreateLocationDto) {
    const newLocation = this.locationDataBase.create({
      name: createLocationDto.name,
      department: createLocationDto.department,
      touristInfo: createLocationDto.touristInfo,
      isActive: true,
    });
    return await this.locationDataBase.save(newLocation);
  }

  async updateRepository(
    locationToUpdate: Locations,
    updateLocationDto: UpdateLocationDto,
  ) {
    if (updateLocationDto.name) {
      locationToUpdate.name = updateLocationDto.name;
    }
    if (updateLocationDto.department) {
      locationToUpdate.department = updateLocationDto.department;
    }
    if (updateLocationDto.touristInfo !== undefined) {
      locationToUpdate.touristInfo = updateLocationDto.touristInfo;
    }
    return await this.locationDataBase.save(locationToUpdate);
  }

  async softDeleteRepository(location: Locations) {
    location.isActive = false;
    await this.locationDataBase.save(location);
    return { message: 'Ubicación desactivada exitosamente' };
  }

  async getLegendsFromLocation(id: string) {
    const location = await this.locationDataBase.findOne({
      where: { uuid: id },
      relations: ['legends'],
    });
    return location?.legends || [];
  }
}


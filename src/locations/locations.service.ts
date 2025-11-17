import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LocationsRepository } from './locations.repository';
import { CreateLocationDto } from './Dtos/createLocation.dto';
import { UpdateLocationDto } from './Dtos/updateLocation.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly locationsRepository: LocationsRepository) {}

  findAll() {
    return this.locationsRepository.findAllRepository();
  }

  async findOne(id: string) {
    const location = await this.locationsRepository.findByIdRepository(id);
    if (!location) {
      throw new NotFoundException('Ubicación no encontrada');
    }
    return location;
  }

  async create(createLocationDto: CreateLocationDto) {
    const locationExists =
      await this.locationsRepository.findByNameRepository(
        createLocationDto.name,
      );
    if (locationExists) {
      throw new ConflictException('La ubicación ya existe');
    }
    return this.locationsRepository.createLocationRepository(
      createLocationDto,
    );
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const locationToUpdate =
      await this.locationsRepository.findByIdRepository(id);
    if (!locationToUpdate) {
      throw new NotFoundException('La ubicación no existe');
    }
    return this.locationsRepository.updateRepository(
      locationToUpdate,
      updateLocationDto,
    );
  }

  async remove(id: string) {
    const location = await this.locationsRepository.findByIdRepository(id);
    if (!location) {
      throw new NotFoundException('La ubicación no existe');
    }
    if (!location.isActive) {
      throw new ConflictException('La ubicación ya está desactivada');
    }
    return this.locationsRepository.softDeleteRepository(location);
  }

  async getLegendsFromLocation(id: string) {
    const location = await this.locationsRepository.findByIdRepository(id);
    if (!location) {
      throw new NotFoundException('Ubicación no encontrada');
    }
    return this.locationsRepository.getLegendsFromLocation(id);
  }
}


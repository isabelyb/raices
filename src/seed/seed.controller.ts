import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Datos iniciales')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({
    summary: 'Cargar datos iniciales en la base de datos',
    description:
      'Carga categorías, ubicaciones, leyendas y un usuario administrador. Solo funciona si la BD está vacía.',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos cargados exitosamente',
  })
  async seed() {
    return await this.seedService.seed();
  }
}


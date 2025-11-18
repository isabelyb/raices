import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLocationDto } from './Dtos/createLocation.dto';
import { UpdateLocationDto } from './Dtos/updateLocation.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';

@ApiTags('Ubicaciones')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las ubicaciones activas' })
  @ApiResponse({
    status: 200,
    description: 'Ubicaciones obtenidas exitosamente',
  })
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ubicación por ID' })
  @ApiResponse({
    status: 200,
    description: 'Ubicación encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Ubicación no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Get(':id/legends')
  @ApiOperation({ summary: 'Obtener todas las leyendas de una ubicación' })
  @ApiResponse({
    status: 200,
    description: 'Leyendas de la ubicación obtenidas',
  })
  @ApiResponse({
    status: 404,
    description: 'Ubicación no encontrada',
  })
  getLegendsFromLocation(@Param('id') id: string) {
    return this.locationsService.getLegendsFromLocation(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear nueva ubicación' })
  @ApiResponse({
    status: 201,
    description: 'Ubicación creada exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'La ubicación ya existe',
  })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar ubicación' })
  @ApiResponse({
    status: 200,
    description: 'Ubicación actualizada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Ubicación no encontrada',
  })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Desactivar ubicación (soft delete)' })
  @ApiResponse({
    status: 200,
    description: 'Ubicación desactivada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Ubicación no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}


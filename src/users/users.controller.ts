import { Controller, Get, Put, Delete, Post, Param, Body, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './Dto/update-user.dto';
import { CreateUserDto } from './Dto/create-user.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear usuario (solo Admin)' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar todos los usuarios (solo Admin)' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener usuario por UUID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Put(':uuid')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(uuid, dto);
  }

  @Delete(':uuid')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Desactivar usuario (solo Admin)' })
  @ApiResponse({ status: 200, description: 'Usuario desactivado' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.softDelete(uuid);
  }

  @Get(':uuid/favorites')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener favoritos del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de leyendas favoritas' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getFavorites(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.getFavorites(uuid);
  }

  @Post(':uuid/favorites/:legendId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Agregar leyenda a favoritos' })
  @ApiResponse({ status: 200, description: 'Leyenda agregada a favoritos' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario o leyenda no encontrado' })
  addFavorite(@Param('uuid', ParseUUIDPipe) uuid: string, @Param('legendId', ParseUUIDPipe) legendId: string) {
    return this.usersService.addFavorite(uuid, legendId);
  }

  @Delete(':uuid/favorites/:legendId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Eliminar leyenda de favoritos' })
  @ApiResponse({ status: 200, description: 'Leyenda eliminada de favoritos' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario o leyenda no encontrado' })
  removeFavorite(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Param('legendId', ParseUUIDPipe) legendId: string,
  ) {
    return this.usersService.removeFavorite(uuid, legendId);
  }
}
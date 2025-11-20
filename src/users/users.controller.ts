import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
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
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar todos los usuarios (solo Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener usuario por UUID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  //@ApiParam({ name: 'uuid', description: 'UUID del usuario', type: 'string', format: 'uuid', example: '050ac1a1-ec37-4880-b39b-6e39ec33c868' })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Put(':uuid')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'UUID inválido o datos de validación incorrectos',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del usuario a actualizar',
    type: 'string',
    format: 'uuid',
    example: '050ac1a1-ec37-4880-b39b-6e39ec33c868',
  })
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(uuid, dto);
  }

  @Delete(':uuid')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Desactivar usuario (solo Admin)' })
  @ApiResponse({ status: 200, description: 'Usuario desactivado exitosamente' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 409, description: 'El usuario ya está desactivado' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del usuario a desactivar',
    type: 'string',
    format: 'uuid',
    example: '050ac1a1-ec37-4880-b39b-6e39ec33c868',
  })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.softDelete(uuid);
  }

  @Get(':uuid/favorites')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener favoritos del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de leyendas favoritas obtenida exitosamente',
  })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del usuario',
    type: 'string',
    format: 'uuid',
    example: '050ac1a1-ec37-4880-b39b-6e39ec33c868',
  })
  getFavorites(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.getFavorites(uuid);
  }

  @Post(':uuid/favorites/:legendId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Agregar leyenda a favoritos' })
  @ApiResponse({
    status: 200,
    description: 'Leyenda agregada a favoritos exitosamente',
  })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario o leyenda no encontrado' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del usuario',
    type: 'string',
    format: 'uuid',
    example: '050ac1a1-ec37-4880-b39b-6e39ec33c868',
  })
  @ApiParam({
    name: 'legendId',
    description: 'UUID de la leyenda',
    type: 'string',
    format: 'uuid',
    example: 'cb4efd09-1a9e-49d3-8974-a26a02f16165',
  })
  addFavorite(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Param('legendId', ParseUUIDPipe) legendId: string,
  ) {
    return this.usersService.addFavorite(uuid, legendId);
  }

  @Delete(':uuid/favorites/:legendId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Eliminar leyenda de favoritos' })
  @ApiResponse({
    status: 200,
    description: 'Leyenda eliminada de favoritos exitosamente',
  })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario o leyenda no encontrado' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del usuario',
    type: 'string',
    format: 'uuid',
    example: '050ac1a1-ec37-4880-b39b-6e39ec33c868',
  })
  @ApiParam({
    name: 'legendId',
    description: 'UUID de la leyenda',
    type: 'string',
    format: 'uuid',
    example: 'cb4efd09-1a9e-49d3-8974-a26a02f16165',
  })
  removeFavorite(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Param('legendId', ParseUUIDPipe) legendId: string,
  ) {
    return this.usersService.removeFavorite(uuid, legendId);
  }
}

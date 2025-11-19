import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import {LegendsService} from './legends.service';
import {CreateLegendsDto } from './Dto/createLegends.dto';
import {UpdateLegendsDto} from './Dto/updateLegends.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';

@ApiTags('Legends')
@Controller('legends')
export class LegendsController {
    constructor(
        private readonly legendsService: LegendsService,
    ){}

    @ApiOperation({ summary: 'Obtener todas las leyendas' })
    @ApiResponse({ status: 200, description: 'Lista de leyendas obtenida exitosamente' })
    @Get()
    getAllLegendsController(){
        return this.legendsService.getAllLegendsService();
    }

    @ApiOperation({ summary: 'Obtener leyenda por UUID' })
    @ApiResponse({ status: 200, description: 'Leyenda encontrada' })
    @ApiResponse({ status: 404, description: 'Leyenda no encontrada' })
    @Get('legendById/:uuid')
    getLegendByIdController(@Param('uuid', ParseUUIDPipe)uuid: string){
        return this.legendsService.getLegendByIdService(uuid);
    }

    @ApiOperation({ summary: 'Obtener leyenda por título' })
    @ApiResponse({ status: 200, description: 'Leyenda encontrada' })
    @ApiResponse({ status: 404, description: 'Leyenda no encontrada' })
    @Get('getByTitle/:title')
    getLegendByTitleController(@Param('title')title: string){
        return this.legendsService.getLegendByTitleService(title);
    }

    @ApiOperation({ summary: 'Obtener leyenda por URL de imagen' })
    @ApiResponse({ status: 200, description: 'Leyenda encontrada' })
    @ApiResponse({ status: 404, description: 'Leyenda no encontrada' })
    @Get('legendByUrl/:url')
    getLegendByUrlController(@Param('url')url: string){
        return this.legendsService.getLegendByUrlService(url);
    }

    @ApiOperation({ summary: 'Crear nueva leyenda (solo ADMIN)' })
    @ApiResponse({ status: 201, description: 'Leyenda creada exitosamente' })
    @ApiResponse({ status: 409, description: 'Ya existe una leyenda con ese título o URL' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('createLegend')
    createLegendController(@Body()createLegendsDto: CreateLegendsDto){
        return this.legendsService.createLegendService(createLegendsDto);
    }

    @Put(':uuid')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Actualizar leyenda (solo ADMIN)' })
    @ApiParam({ name: 'uuid', description: 'UUID de la leyenda a actualizar', type: 'string', format: 'uuid' })
    @ApiResponse({ status: 200, description: 'Leyenda actualizada exitosamente' })
    @ApiResponse({ status: 400, description: 'UUID inválido' })
    @ApiResponse({ status: 404, description: 'Leyenda no encontrada' })
    @ApiResponse({ status: 409, description: 'El título o URL ya existe' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    updateLegendByIdController(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() updateLegendsDto: UpdateLegendsDto){
        return this.legendsService.updateLegendByIdService(uuid, updateLegendsDto);
    }

    @ApiOperation({ summary: 'Eliminar leyenda (soft delete - solo ADMIN)' })
    @ApiResponse({ status: 200, description: 'Leyenda desactivada exitosamente' })
    @ApiResponse({ status: 404, description: 'Leyenda no encontrada' })
    @ApiResponse({ status: 409, description: 'La leyenda ya está desactivada' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('deleteLegendById/:uuid')
    daleteLegendByIdController(@Param('uuid', ParseUUIDPipe)uuid:string){
        return this.legendsService.daleteLegendByIdService(uuid);
    }

}

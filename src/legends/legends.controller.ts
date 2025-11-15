import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete } from '@nestjs/common';
import {LegendsService} from './legends.service';
import {CreateLegendsDto } from './Dto/createLegends.dto';
import {UpdateLegendsDto} from './Dto/updateLegends.dto';

@Controller('legends')
export class LegendsController {
    constructor(
        private readonly legendsService: LegendsService,
    ){}

    @Get()
    getAllLegendsController(){
        return this.legendsService.getAllLegendsService();
    }

    @Get('legendById/:uuid')
    getLegendByIdController(@Param('uuid', ParseUUIDPipe)uuid: string){
        return this.legendsService.getLegendByIdService(uuid);
    }

    @Get('getByTitle/:title')
    getLegendByTitleController(@Param('title')title: string){
        return this.legendsService.getLegendByTitleService(title);
    }

    @Get('legendByUrl/:url')
    getLegendByUrlController(@Param('url')url: string){
        return this.legendsService.getLegendByUrlService(url);
    }

    /*@Post('createLegend')
    createLegendController(@Body()createLegendsDto: CreateLegendsDto){
        return this.legendsService.createLegendService(createLegendsDto);
    }*/

    /*@Put('updateLegends')
    updateLegendByIdController(updateLegendsDto: UpdateLegendsDto){
        return this.legendsService.updateLegendByIdService(updateLegendsDto);
    }*/

    @Delete('deleteLegendById/:uuid')
    daleteLegendByIdController(@Param('uuid', ParseUUIDPipe)uuid:string){
        return this.legendsService.daleteLegendByIdService(uuid);
    }

}

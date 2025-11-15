import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Legends} from "../entities/legends.entity";
import { Repository } from "typeorm";
import {CreateLegendsDto} from './Dto/createLegends.dto';
import {UpdateLegendsDto} from './Dto/updateLegends.dto';


@Injectable()
export class LegendsRepository{
    constructor(
        @InjectRepository(Legends)
        private readonly legendsDataBase: Repository<Legends>,
        
    ){}

    async getAllLegendsRepository(){
        return this.legendsDataBase.find();
    }

    async getLegendByIdRepository(uuid: string){
        return this.legendsDataBase.findOne({
            where: {uuid: uuid},
            relations: ['category', 'location']
        })
    }
    
    async getLegendByTitleRepository(title: string){
        return this.legendsDataBase.findOne({
            where: {title: title},
            relations: ['category', 'location']
        })
    }

    async getLegendByUrlRepository(url: string){
        return this.legendsDataBase.findOne({
            where: {imageUrl: url},
            relations: ['category', 'location']
        })
    }
    /*async createLegendRepository(createLegendsDto: CreateLegendsDto){
        return this.legendsDataBase.create({
            title: createLegendsDto.title,
            description: createLegendsDto.description,
            imageUrl: createLegendsDto.imageUrl,
            story: createLegendsDto.story,
            origin: createLegendsDto.origin,
            createdAt: createLegendsDto.createdAt,
            category: createLegendsDto.category
        })
    }*/

        
    /*async updateLegendByIdRepository(updateLegendsDto: UpdateLegendsDto, legendExists: Legends){
        if(updateLegendsDto.title){
            legendExists.title = updateLegendsDto.title;
        }

        if(updateLegendsDto.description){
            legendExists.description = updateLegendsDto.description;
        }

        if(updateLegendsDto.imageUrl){
            legendExists.imageUrl = updateLegendsDto.imageUrl;
        }

        if(updateLegendsDto.origin){
            legendExists.origin = updateLegendsDto.origin;
        }

        if(updateLegendsDto.createdAt){
            legendExists.createdAt = updateLegendsDto.createdAt;
        }

        if(updateLegendsDto.story){
            legendExists.story = updateLegendsDto.story;
        }

        if(updateLegendsDto.category){
            legendExists.category = 
        }

        if(updateLegendsDto.location){
            legendExists.location = 
        }
            
        await this.legendsDataBase.save(legendExists);
        return {message: `El mito o leyenda fue actualizado exitosamente`}
    }*/

    async daleteLegendByIdRepository(legendExists: Legends){
        legendExists.isActive = false;
        await this.legendsDataBase.save(legendExists)
        return {message: `${legendExists.title} ha sido desactivada con exito`}
    }
}
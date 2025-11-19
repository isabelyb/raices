import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Legends} from "../entities/legends.entity";
import { Repository, ILike } from "typeorm";
import {CreateLegendsDto} from './Dto/createLegends.dto';
import {UpdateLegendsDto} from './Dto/updateLegends.dto';
import { Categories } from "../entities/categories.entity";
import { Locations } from "../entities/locations.entity";


@Injectable()
export class LegendsRepository{
    constructor(
        @InjectRepository(Legends)
        private readonly legendsDataBase: Repository<Legends>,
        @InjectRepository(Categories)
        private readonly categoriesDataBase: Repository<Categories>,
        @InjectRepository(Locations)
        private readonly locationsDataBase: Repository<Locations>,
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
        return this.legendsDataBase.find({
            where: {title: ILike(`%${title}%`)},
            relations: ['category', 'location']
        })
    }

    async getLegendByUrlRepository(url: string){
        return this.legendsDataBase.findOne({
            where: {imageUrl: url},
            relations: ['category', 'location']
        })
    }
    async createLegendRepository(createLegendsDto: CreateLegendsDto){
        let createdAtDate: Date | undefined;
        if (createLegendsDto.createdAt && typeof createLegendsDto.createdAt === 'string') {
            const [day, month, year] = createLegendsDto.createdAt.split('/');
            createdAtDate = new Date(`${year}-${month}-${day}`);
        }
        
        const newLegend = this.legendsDataBase.create({
            title: createLegendsDto.title,
            description: createLegendsDto.description,
            imageUrl: createLegendsDto.imageUrl,
            story: createLegendsDto.story,
            origin: createLegendsDto.origin,
            createdAt: createdAtDate,
            category: { uuid: createLegendsDto.category },
            location: { uuid: createLegendsDto.location }
        });
        await this.legendsDataBase.save(newLegend);
        return { message: 'Leyenda creada exitosamente', legend: newLegend };
    }

        
    async updateLegendByIdRepository(updateLegendsDto: UpdateLegendsDto, legendExists: Legends){
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
            if (typeof updateLegendsDto.createdAt === 'string') {
                const [day, month, year] = updateLegendsDto.createdAt.split('/');
                legendExists.createdAt = new Date(`${year}-${month}-${day}`);
            } else {
                legendExists.createdAt = updateLegendsDto.createdAt;
            }
        }

        if(updateLegendsDto.story){
            legendExists.story = updateLegendsDto.story;
        }

        if(updateLegendsDto.category && updateLegendsDto.category !== legendExists.category?.uuid){
            const categoryExists = await this.categoriesDataBase.findOne({ where: { uuid: updateLegendsDto.category } });
            if(!categoryExists){
                throw new NotFoundException(`La categoría con uuid ${updateLegendsDto.category} no existe`);
            }
            legendExists.category = { uuid: updateLegendsDto.category } as any;
        }

        if(updateLegendsDto.location && updateLegendsDto.location !== legendExists.location?.uuid){
            const locationExists = await this.locationsDataBase.findOne({ where: { uuid: updateLegendsDto.location } });
            if(!locationExists){
                throw new NotFoundException(`La ubicación con uuid ${updateLegendsDto.location} no existe`);
            }
            legendExists.location = { uuid: updateLegendsDto.location } as any;
        }
            
        await this.legendsDataBase.save(legendExists);
        return {message: `El mito o leyenda fue actualizado exitosamente`};
    }

    async daleteLegendByIdRepository(legendExists: Legends){
        legendExists.isActive = false;
        await this.legendsDataBase.save(legendExists)
        return {message: `${legendExists.title} ha sido desactivada con exito`}
    }
}
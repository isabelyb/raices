import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {LegendsRepository} from './legends.repository';
import {CreateLegendsDto} from './Dto/createLegends.dto';
import {UpdateLegendsDto} from './Dto/updateLegends.dto';

@Injectable()
export class LegendsService {
    constructor(
        private readonly legendsRepository: LegendsRepository,
    ){}

    getAllLegendsService(){
        return this.legendsRepository.getAllLegendsRepository();
    }

    async getLegendByIdService(uuid: string){
        const legendsExists = await this.legendsRepository.getLegendByIdRepository(uuid);
        if(!legendsExists){
            throw new NotFoundException(`La Leyenda con el uuid ${uuid} no existe`);
        }
        return this.legendsRepository.getLegendByIdRepository(uuid);
    }

    async getLegendByTitleService(title: string){
        const legendExists = await this.legendsRepository.getLegendByTitleRepository(title);
        if(!legendExists){
            throw new NotFoundException(`El titulo ${legendExists} no existe`)
        }
        return this.legendsRepository.getLegendByTitleRepository(title);
    }

    async getLegendByUrlService(url: string){
        const legendExists = await this.legendsRepository.getLegendByUrlRepository(url);
        if(!legendExists){
            throw new NotFoundException(`La url ${url} no existe`)
        }
        return this.legendsRepository.getLegendByUrlRepository(url);
    }
    

    async createLegendService(createLegendsDto: CreateLegendsDto){
        const titleExists = await this.legendsRepository.getLegendByTitleRepository(createLegendsDto.title);
        if(titleExists){
            throw new ConflictException(`Ya existe un mito o leyenda con este titulo`)
        }
        const urlExists = await this.legendsRepository.getLegendByUrlRepository(createLegendsDto.imageUrl);
        if(urlExists){
            throw new ConflictException(`Ya existe un mito o leyenda con esta url de imagen`)
        }
        return this.legendsRepository.createLegendRepository(createLegendsDto);
    }

    async updateLegendByIdService(updateLegendsDto: UpdateLegendsDto){
        const legendExists = await this.legendsRepository.getLegendByIdRepository(updateLegendsDto.uuid);
        if(!legendExists){
            throw new NotFoundException(`La leyenda o mito con el uuid ${updateLegendsDto.uuid} no existe`)
        }
        if(updateLegendsDto.imageUrl){
            const urlExists = await this.legendsRepository.getLegendByUrlRepository(updateLegendsDto.imageUrl)
            if(urlExists){
                throw new ConflictException(`La url de la imagen ${updateLegendsDto.imageUrl} ya existe`)
            }
            if(updateLegendsDto.title){
                const titleExists = await this.legendsRepository.getLegendByTitleRepository(updateLegendsDto.title);
                if(titleExists){
                    throw new ConflictException(`El titulo ya existe`)
                }
            }
        }
        return this.legendsRepository.updateLegendByIdRepository(updateLegendsDto, legendExists);
    }

    async daleteLegendByIdService(uuid: string){
        const legendExists = await this.legendsRepository.getLegendByIdRepository(uuid);
        if(!legendExists){
            throw new NotFoundException(`La leyenda o miro con el uuid ${uuid} no existe`)
        }
        if(legendExists.isActive === false){
            throw new ConflictException(`La leyenda o mito con el uuid ${uuid} ya se encuentra desactivada`)
        }
        return this.legendsRepository.daleteLegendByIdRepository(legendExists);

    }
}

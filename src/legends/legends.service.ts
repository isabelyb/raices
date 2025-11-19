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
        return this.legendsRepository.createLegendRepository(createLegendsDto);
    }

    async updateLegendByIdService(uuid: string, updateLegendsDto: UpdateLegendsDto){
        const legendExists = await this.legendsRepository.getLegendByIdRepository(uuid);
        if(!legendExists){
            throw new NotFoundException(`La leyenda o mito con el uuid ${uuid} no existe`)
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

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './Dtos/createCategory.dto';
import { UpdateCategoryDto } from './Dtos/updateCategory.dto';

@Injectable()
export class CategoriesService {
    constructor (private readonly categoriesRepository: CategoriesRepository) {}
    // Servicio para obtener todas las categorias
    findAllServices() {
        return this.categoriesRepository.findAllRepository();
    }
    // Servicio para crear una categoria
    async createCategory(CreateCategoryDto: CreateCategoryDto) {
        const categoryExists =await this.categoriesRepository.findByNameRepository(
            CreateCategoryDto.name,
        );
        if (categoryExists){
            throw new ConflictException('La categoria ya existe');
        }
        return this.categoriesRepository.createCategoryRepository(CreateCategoryDto);
    }
     // Servicio para actualizar una categoria
    async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const categoryToUpdate = await this.categoriesRepository.findByIdRepository(
      updateCategoryDto.id,
    );
    if (!categoryToUpdate) {
      throw new NotFoundException('La categoria no existe');
    }
    return this.categoriesRepository.updateRepository(
      categoryToUpdate,
      updateCategoryDto,
    );
  }
  
        
}

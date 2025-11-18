import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './Dtos/createCategory.dto';
import { UpdateCategoryDto } from './Dtos/updateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  findAll() {
    return this.categoriesRepository.findAllRepository();
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findByIdRepository(id);
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists =
      await this.categoriesRepository.findByNameRepository(
        createCategoryDto.name,
      );
    if (categoryExists) {
      throw new ConflictException('La categoría ya existe');
    }
    return this.categoriesRepository.createCategoryRepository(
      createCategoryDto,
    );
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryToUpdate =
      await this.categoriesRepository.findByIdRepository(id);
    if (!categoryToUpdate) {
      throw new NotFoundException('La categoría no existe');
    }
    return this.categoriesRepository.updateRepository(
      categoryToUpdate,
      updateCategoryDto,
    );
  }

  async remove(id: string) {
    const category = await this.categoriesRepository.findByIdRepository(id);
    if (!category) {
      throw new NotFoundException('La categoría no existe');
    }
    if (!category.isActive) {
      throw new ConflictException('La categoría ya está desactivada');
    }
    return this.categoriesRepository.softDeleteRepository(category);
  }
}

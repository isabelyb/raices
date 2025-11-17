import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./Dtos/createCategory.dto";
import { UpdateCategoryDto } from "./Dtos/updateCategory.dto";

@Injectable()
export class CategoriesRepository {
 
    constructor (
        @InjectRepository(Categories)
        private readonly categoryDataBase: Repository<Categories>,
    ){}
    //metodo para obtener todas las categorias
    async findAllRepository() {
        return await this.categoryDataBase.find();
    }   
    //metodo para buscar una categoria por su nombre
    async findByNameRepository(name: string) {
    return await this.categoryDataBase.findOne({
         where: { name: name } 
        });
  }
  async createCategoryRepository(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryDataBase.create({
      name: createCategoryDto.name,
      description: createCategoryDto.description,
      isActive: true,
    });
    return await this.categoryDataBase.save(newCategory);
  }
  //metodo para buscar una categoria por su id
  async findByIdRepository(id: string) {
    return await this.categoryDataBase.findOne({ where: { uuid: id } });
  }

  async updateRepository(
    categoryToUpdate: Categories,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    if (updateCategoryDto.name) {
      categoryToUpdate.name = updateCategoryDto.name;
    }
    if (updateCategoryDto.description) {
      categoryToUpdate.description = updateCategoryDto.description;
    }
    return await this.categoryDataBase.save(categoryToUpdate);
  }

  async softDeleteRepository(category: Categories) {
    category.isActive = false;
    await this.categoryDataBase.save(category);
    return { message: 'Categoría desactivada exitosamente' };
  }
}
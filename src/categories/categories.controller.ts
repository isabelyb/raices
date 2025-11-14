import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from './Dtos/createCategory.dto';
import { UpdateCategoryDto } from './Dtos/updateCategory.dto';

@Controller('categories')
export class CategoriesController {
    constructor ( private readonly categoriesService: CategoriesService ) {}
    // Endpoint para obtener todas las categorias
    @ApiOperation({ summary: 'Obtener todas las categorias' })
    @ApiResponse({
    status: 200,
    description: 'Categorias obtenidas exitosamente.',
  })
    @Get('allCategories')
    findAllCategories() {
        return this.categoriesService.findAllServices();
    }

    //Endpoint para crear una categoria
    @ApiOperation({ summary: 'Crear una categoria' })
    @ApiResponse({
    status: 201,
    description: 'Categoria creada exitosamente.',
  })
    @Post('createCategory')
    createCategory(@Body()CreateCategoryDto: CreateCategoryDto) {
        return this.categoriesService.createCategory(CreateCategoryDto)
    }

    //Endpoint para actualizar una categoria
  @ApiOperation({ summary: 'Actualizar una categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria actualizada exitosamente.',
  })
  @Put('updateCategory')
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(updateCategoryDto);
  }
}

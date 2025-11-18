import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Leyendas de Terror',
  })
  @IsNotEmpty({
    message: 'El nombre de la categoría es obligatorio',
  })
  @IsString({
    message: 'El nombre de la categoría debe ser una cadena de texto',
  })
  @MinLength(4, {
    message: 'El nombre de la categoría debe tener al menos 4 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre de la categoría no puede tener más de 50 caracteres',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción de la categoría',
    example:
      'Historias de terror que han pasado de generación en generación...',
  })
  @IsNotEmpty({
    message: 'La descripción de la categoría es obligatoria',
  })
  @IsString({
    message: 'La descripción de la categoría debe ser una cadena de texto',
  })
  @MinLength(50, {
    message: 'La descripción de la categoría debe tener al menos 50 caracteres',
  })
  @MaxLength(1000, {
    message:
      'La descripción de la categoría no puede tener más de 1000 caracteres',
  })
  description: string;
}

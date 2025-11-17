import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Nombre de la ubicación',
    example: 'Laguna de Guatavita',
  })
  @IsNotEmpty({ message: 'El nombre de la ubicación es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Departamento de Colombia',
    example: 'Cundinamarca',
  })
  @IsNotEmpty({ message: 'El departamento es obligatorio' })
  @IsString({ message: 'El departamento debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El departamento no puede exceder 100 caracteres' })
  department: string;

  @ApiProperty({
    description: 'Información turística de la ubicación',
    example: 'Laguna sagrada ubicada a 57 km de Bogotá...',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La información turística debe ser una cadena de texto' })
  touristInfo?: string;
}


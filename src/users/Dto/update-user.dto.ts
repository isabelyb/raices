import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'María',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name?: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Rodríguez',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
  lastname?: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: '3001234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @MaxLength(15, { message: 'El teléfono no puede exceder 15 caracteres' })
  phone?: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'maria@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @MaxLength(150, { message: 'El email no puede exceder 150 caracteres' })
  email?: string;

  @ApiProperty({
    description: 'Ubicación o ciudad',
    example: 'Bogotá, Colombia',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La ubicación debe ser una cadena de texto' })
  @MaxLength(150, { message: 'La ubicación no puede exceder 150 caracteres' })
  location?: string;

  @ApiProperty({
    description: 'Estado activo del usuario',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'El estado activo debe ser un valor booleano' })
  isActive?: boolean;
}

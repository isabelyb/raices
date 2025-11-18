import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'María',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Rodríguez',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastname?: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: '3001234567',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'maria@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @ApiProperty({
    description: 'Ubicación o ciudad',
    example: 'Bogotá, Colombia',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  location?: string;

  @ApiProperty({
    description: 'Estado activo del usuario',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength, IsBoolean, IsNotEmpty, MinLength, Matches, Validate } from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'María',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Rodríguez',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  lastname: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: '3001234567',
    maxLength: 15,
  })
  @IsString()
  @MaxLength(15)
  phone: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'maria@example.com',
    maxLength: 150,
  })
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({
    description: 'Ubicación o ciudad del usuario',
    example: 'Bogotá, Colombia',
    maxLength: 150,
  })
  @IsString()
  @MaxLength(150)
  location: string;

  @ApiProperty({
    description: 'Estado activo del usuario',
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean()
  isActive?: boolean;
  
  @ApiProperty({
    description: 'Nombre de usuario para login',
    example: 'maria.rodriguez',
    minLength: 3,
    maxLength: 25,
  })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  @MaxLength(25, { message: 'El nombre de usuario no debe tener mas de 25 caracteres' })
  username: string;

  @ApiProperty({
    description: 'Contraseña (8-25 caracteres, incluir mayúscula, minúscula, número y carácter especial)',
    example: 'Password123!',
    minLength: 8,
    maxLength: 25,
  })
  @IsNotEmpty({ message: 'La contraseña del usuario es requerida' })
  @IsString({ message: 'La contraseña del usuario debe ser una cadena de caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,25}$/,
    {
      message: 'La contraseña debe tener entre 8 y 25 caracteres, incluir mayúscula, minúscula, número y un carácter especial',
    },
  )
  password: string;

  @ApiProperty({
    description: 'Confirmación de contraseña (debe coincidir con password)',
    example: 'Password123!',
  })
  @Validate(MatchPassword, ['password'])
  confirmar_password: string;
}

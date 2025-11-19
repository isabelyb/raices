import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength, IsBoolean, IsNotEmpty, MinLength, Matches, Validate } from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'María',
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Rodríguez',
    maxLength: 100,
  })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
  lastname: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: '3001234567',
    maxLength: 15,
  })
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @MaxLength(15, { message: 'El teléfono no puede exceder 15 caracteres' })
  phone: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'maria@example.com',
    maxLength: 150,
  })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @MaxLength(150, { message: 'El email no puede exceder 150 caracteres' })
  email: string;

  @ApiProperty({
    description: 'Ubicación o ciudad del usuario',
    example: 'Bogotá, Colombia',
    maxLength: 150,
  })
  @IsString({ message: 'La ubicación debe ser una cadena de texto' })
  @MaxLength(150, { message: 'La ubicación no puede exceder 150 caracteres' })
  location: string;

  @ApiProperty({
    description: 'Estado activo del usuario',
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean({ message: 'El estado activo debe ser un valor booleano' })
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

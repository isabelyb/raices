import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class SignUpDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'María Rodríguez',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'maria.rodriguez@example.com',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: '3001234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  @MaxLength(15, { message: 'El teléfono no puede exceder 15 caracteres' })
  phone?: string;

  @ApiProperty({
    description: 'Ubicación o ciudad del usuario',
    example: 'Bogotá, Colombia',
  })
  @IsNotEmpty({ message: 'La ubicación es requerida' })
  @IsString({ message: 'La ubicación debe ser texto' })
  @MaxLength(150, { message: 'La ubicación no puede exceder 150 caracteres' })
  location: string;

  @ApiProperty({
    description: 'Nombre de usuario para login',
    example: 'maria.rodriguez',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser texto' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre de usuario no puede exceder 50 caracteres',
  })
  username: string;

  @ApiProperty({
    description:
      'Contraseña (mínimo 8 caracteres, incluir mayúscula, minúscula, número y carácter especial)',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser texto' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,100}$/,
    {
      message:
        'La contraseña debe tener entre 8 y 100 caracteres, incluir mayúscula, minúscula, número y carácter especial',
    },
  )
  password: string;

  @ApiProperty({
    description: 'Confirmación de contraseña (debe coincidir con password)',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'La confirmación de contraseña es requerida' })
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;
}


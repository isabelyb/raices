
import { IsString, IsEmail, MaxLength, IsBoolean, IsNotEmpty, MinLength, Matches, Validate } from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {

  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  lastname: string;

  @IsString()
  @MaxLength(15)
  phone: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @MaxLength(150)
  location: string;

  @IsBoolean()
  isActive?: boolean;
  static username: any;
  
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  @MaxLength(25, { message: 'El nombre de usuario no debe tener mas de 25 caracteres' })
  username: string;

    @IsNotEmpty({ message: 'La contraseña del usuario es requerida' })
  @IsString({ message: 'La contraseña del usuario debe ser una cadena de caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,25}$/,
    {
      message: 'La contraseña debe tener entre 8 y 25 caracteres, incluir mayúscula, minúscula, número y un carácter especial',
    },
  )
  password: string;

  @Validate(MatchPassword, ['password'])
  confirmar_password: string;
}

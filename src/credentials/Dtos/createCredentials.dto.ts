import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "src/enums/roles.enum";

export class createCredentialsDto {

    @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
    @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
    @MinLength(3, { message: 'El nombre de usuario debe tener mínimo 3 caracteres' })
    @MaxLength(50, { message: 'El nombre de usuario no puede tener más de 50 caracteres' })
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message: 'El nombre de usuario solo puede contener letras, números y guiones bajos'
    })
    
    username: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
    @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    })

    password: string;

    @IsEnum(Role, {
    message: `El rol debe ser uno de los siguientes valores: ${Object.values(Role).join(', ')}`,
  })
    role: Role;
      @IsOptional()
     @IsBoolean({ message: 'El estado activo debe ser un valor booleano' })
     isActive: boolean;

      @IsNotEmpty({ message: 'El ID del usuario es requerido' })
      @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
    user_id: string;

}

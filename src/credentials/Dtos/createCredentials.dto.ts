import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "src/enums/roles.enum";

export class createCredentialsDto {

    @ApiProperty({
        description: 'Nombre de usuario único',
        example: 'usuario123',
        minLength: 3,
        maxLength: 50,
    })
    @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
    @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
    @MinLength(3, { message: 'El nombre de usuario debe tener mínimo 3 caracteres' })
    @MaxLength(50, { message: 'El nombre de usuario no puede tener más de 50 caracteres' })
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message: 'El nombre de usuario solo puede contener letras, números y guiones bajos'
    })
    username: string;

    @ApiProperty({
        description: 'Contraseña (mínimo 6 caracteres, incluir mayúscula, minúscula y número)',
        example: 'Password123',
        minLength: 6,
    })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
    @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

    @ApiProperty({
        description: 'Rol del usuario',
        example: Role.USER,
        enum: Role,
    })
    @IsEnum(Role, {
    message: `El rol debe ser uno de los siguientes valores: ${Object.values(Role).join(', ')}`,
  })
    role: Role;
    
    @ApiProperty({
        description: 'Estado activo de las credenciales',
        example: true,
        required: false,
        default: true,
    })
    @IsOptional()
    @IsBoolean({ message: 'El estado activo debe ser un valor booleano' })
    isActive: boolean;

    @ApiProperty({
        description: 'UUID del usuario asociado',
        example: 'c6f920bf-f186-4082-9fa5-cc6631df201d',
        format: 'uuid',
    })
    @IsNotEmpty({ message: 'El ID del usuario es requerido' })
    @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
    user_id: string;

}

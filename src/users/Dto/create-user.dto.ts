import { IsString, IsEmail, MaxLength, IsBoolean } from 'class-validator';

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
}

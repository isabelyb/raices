import { IsNotEmpty, IsString, Length, Matches, IsUrl, IsUUID } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateLegendsDto{
    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsString({message: `Este campo debe de ser una cadena de string`})
    @Length(3,50, {message: 'El titulo debe tener entre 3 y 50 caracteres'})
    title: string;

    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsString({message: `Este campo debe de ser una cadena de string`})
    @Length(5, 500, {message: 'La descripción  debe tener entre 5 y 500 caracteres'})
    description: string;

    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsUrl({},{message: `Este campo debe de ser una url`})
    imageUrl: string;

    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsString({message: `Este campo debe de ser una cadena de string`})
    story: string;

    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsString({message: `Este campo debe de ser texto`})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, {
    message: 'Solo se permiten letras y espacios'
    })
    @Length(3, 100,{message: `El origen debe tener entre 3 y 100 caracteres` })
    origin: string;

    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'El formato debe ser DD/MM/YYYY',
    })
    @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    return new Date(`${year}-${month}-${day}`);
    })
    createdAt: Date;

    @IsNotEmpty({ message: 'Debe asociar una categoría para el mito o leyenda' })
    @IsUUID('4', {
    message: 'El identificador de la categoría debe ser un UUID válido.',
    })
    category: string;

    @IsNotEmpty({ message: 'Debe asociar una ubicación para el mito o leyenda' })
    @IsUUID('4', {
    message: 'El identificador de la ubicación debe ser un UUID válido.',
    })
    location: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches, IsUrl, IsUUID, IsOptional } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateLegendsDto{
    @ApiProperty({
        description: 'Título de la leyenda o mito',
        example: 'La Madremonte',
        minLength: 3,
        maxLength: 50,
    })
    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsString({message: `Este campo debe de ser una cadena de string`})
    @Length(3,50, {message: 'El titulo debe tener entre 3 y 50 caracteres'})
    title: string;

    @ApiProperty({
        description: 'Descripción breve de la leyenda',
        example: 'Espíritu protector de la naturaleza que habita en bosques y selvas...',
        minLength: 5,
        maxLength: 500,
    })
    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsString({message: `Este campo debe de ser una cadena de string`})
    @Length(5, 500, {message: 'La descripción  debe tener entre 5 y 500 caracteres'})
    description: string;

    @ApiProperty({
        description: 'URL de la imagen de la leyenda',
        example: 'https://res.cloudinary.com/example/image.jpg',
    })
    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsUrl({},{message: `Este campo debe de ser una url`})
    imageUrl: string;

    @ApiProperty({
        description: 'Historia completa de la leyenda',
        example: 'Dicen los campesinos que cuando la neblina baja pesada...',
    })
    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsString({message: `Este campo debe de ser una cadena de string`})
    story: string;

    @ApiProperty({
        description: 'Lugar de origen de la leyenda',
        example: 'El Carmen de Viboral, Antioquia',
        minLength: 3,
        maxLength: 100,
    })
    @IsNotEmpty({message: `Este campo no puede estar vacío`})
    @IsString({message: `Este campo debe de ser texto`})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ,]+$/, {
    message: 'Solo se permiten letras, espacios y comas'
    })
    @Length(3, 100,{message: `El origen debe tener entre 3 y 100 caracteres` })
    origin: string;

    @ApiProperty({
        description: 'Fecha de creación (opcional, formato DD/MM/YYYY)',
        example: '17/11/2025',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'El formato debe ser DD/MM/YYYY',
    })
    createdAt?: string;

    @ApiProperty({
        description: 'UUID de la categoría asociada',
        example: 'c6f920bf-f186-4082-9fa5-cc6631df201d',
        format: 'uuid',
    })
    @IsNotEmpty({ message: 'Debe asociar una categoría para el mito o leyenda' })
    @IsUUID('4', {
    message: 'El identificador de la categoría debe ser un UUID válido.',
    })
    category: string;

    @ApiProperty({
        description: 'UUID de la ubicación asociada',
        example: 'df8f7546-6899-4c74-9439-d95928e82dc5',
        format: 'uuid',
    })
    @IsNotEmpty({ message: 'Debe asociar una ubicación para el mito o leyenda' })
    @IsUUID('4', {
    message: 'El identificador de la ubicación debe ser un UUID válido.',
    })
    location: string;
}
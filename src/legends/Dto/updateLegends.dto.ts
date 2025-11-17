import { PartialType } from "@nestjs/mapped-types";
import {CreateLegendsDto} from './createLegends.dto';
import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateLegendsDto extends PartialType(CreateLegendsDto){
    @IsNotEmpty({message: `El campo no puede estar vacio`})
    @IsUUID('4',{message: `El uuid de la leyenda o mito debe tener un formato UUID`})
    uuid: string;
}
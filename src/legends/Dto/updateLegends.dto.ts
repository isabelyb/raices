import { PartialType, ApiProperty } from "@nestjs/swagger";
import {CreateLegendsDto} from './createLegends.dto';
import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateLegendsDto extends PartialType(CreateLegendsDto){
    @ApiProperty({
        description: 'UUID de la leyenda a actualizar',
        example: '57f33857-eb52-4b0b-83ec-72c806325806',
        format: 'uuid',
    })
    @IsNotEmpty({message: `El campo no puede estar vacio`})
    @IsUUID('4',{message: `El uuid de la leyenda o mito debe tener un formato UUID`})
    uuid: string;
}
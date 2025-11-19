import { PartialType } from "@nestjs/mapped-types";
import {CreateLegendsDto} from './createLegends.dto';

export class UpdateLegendsDto extends PartialType(CreateLegendsDto) {}
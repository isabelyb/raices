import { PartialType } from "@nestjs/mapped-types";
import { createCredentialsDto } from "./createCredentials.dto";

export class UpdateCredencialesDto extends PartialType(createCredentialsDto) {}
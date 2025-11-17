import { PartialType } from "@nestjs/swagger";
import { createCredentialsDto } from "./createCredentials.dto";

export class UpdateCredentialsDto extends PartialType(createCredentialsDto) {}
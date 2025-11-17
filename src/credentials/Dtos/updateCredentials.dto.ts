import { PartialType } from "@nestjs/mapped-types";
import { createCredentialsDto } from "./createCredentials.dto";

export class UpdateCredentialsDto extends PartialType(createCredentialsDto) {
    user: any;
}
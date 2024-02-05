import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CreateTicketDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    status: string;

    @Expose()
    userId: number;

}

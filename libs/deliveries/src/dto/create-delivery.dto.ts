import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateDeliveryDto {
    @ApiProperty()
    @IsNotEmpty()
    order: string;

    @ApiProperty()
    @IsNotEmpty()
    carrier: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    estimatedDeliveryDate: Date;
}

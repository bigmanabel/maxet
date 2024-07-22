import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional } from "class-validator";

export class DeliveryQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    order: string;

    @ApiProperty({ required: false })
    @IsOptional()
    carrier: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDate()
    estimatedDeliveryDate: Date;
}

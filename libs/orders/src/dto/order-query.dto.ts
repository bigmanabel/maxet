import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class OrderQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    totalAmountMin: number;

    @ApiProperty({ required: false })
    @IsOptional()
    totalAmountMax: number;

    @ApiProperty({ required: false })
    @IsOptional()
    deliveryDate: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    deliveryAddress: string;
}
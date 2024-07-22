import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ListingsQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    description: string;

    @ApiProperty({ required: false })
    @IsOptional()
    priceMin: number;

    @ApiProperty({ required: false })
    @IsOptional()
    priceMax: number;

    @ApiProperty({ required: false })
    @IsOptional()
    shop: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ShopQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    bio: string;

    @ApiProperty({ required: false })
    @IsOptional()
    location: string;

    // @ApiProperty({ required: false })
    // @IsOptional()
    // owner: string;
}
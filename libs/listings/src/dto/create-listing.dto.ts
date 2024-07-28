import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateListingDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    stockQuantity: number;

    @ApiProperty()
    @IsNotEmpty()
    shop: string;

    @ApiProperty()
    @IsNotEmpty()
    category: string;
}

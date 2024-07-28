import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ description: 'The name of the category' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The image of the category', type: 'binary', format: 'string' })
    image: string;
}

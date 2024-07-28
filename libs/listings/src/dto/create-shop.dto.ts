import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateShopDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    bio: string;

    @ApiProperty()
    @IsNotEmpty()
    location: string;

    @ApiProperty({ type: 'binary', format: 'string' })
    image: string;
        
    @ApiProperty()
    @IsNotEmpty()
    owner: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()        
    listings: string[];

    @ApiProperty()
    @IsNotEmpty()
    totalAmount: number;
    
    @ApiProperty()
    @IsNotEmpty()
    deliveryDate: Date;

    @ApiProperty()
    @IsNotEmpty()    
    deliveryAddress: string;
}

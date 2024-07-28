import { Role } from "@app/users";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsStrongPassword, Min, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsStrongPassword()
    @MinLength(8)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    firstName: string

    @ApiProperty()
    @IsNotEmpty()
    lastName: string    
    
    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string

    @ApiProperty({ type: 'binary', format: 'string' })
    @IsOptional()
    avatar: string;

    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    role: Role;
}

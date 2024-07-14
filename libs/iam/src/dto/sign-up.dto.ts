import { Role } from "@app/users";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsStrongPassword, Min, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsStrongPassword()
    @MinLength(8)
    password: string;

    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    role: Role;
}

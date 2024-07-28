import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { SignUpDto } from '@app/iam';

export class UpdateUserDto extends PartialType(SignUpDto) {}

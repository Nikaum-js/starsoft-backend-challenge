import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of the user', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ description: 'Confirmation of the password', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  readonly confirmPassword: string;

  @ApiProperty({ description: 'Avatar URL of the user', required: false })
  readonly avatar_url?: string;
}

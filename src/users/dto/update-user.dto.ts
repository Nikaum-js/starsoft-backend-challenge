import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Name of the user' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({ description: 'Email of the user' })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional({ description: 'Password of the user', minLength: 6 })
  @IsOptional()
  @MinLength(6)
  readonly password?: string;

  @ApiPropertyOptional({ description: 'Avatar URL of the user' })
  @IsOptional()
  @IsString()
  readonly avatar_url?: string;
}

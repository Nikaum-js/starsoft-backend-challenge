import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Match } from '../../validators/match.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  readonly password?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  @Match('password', { message: 'Passwords do not match' })
  readonly confirmPassword?: string;

  @IsOptional()
  readonly avatar_url?: string;
}

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../../validators/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @MinLength(6)
  @Match('password', { message: 'Passwords do not match' })
  readonly confirmPassword: string;

  readonly avatar_url?: string;
}

import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class ValidateUserDTo {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

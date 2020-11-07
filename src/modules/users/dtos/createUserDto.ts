import { IsString, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsString()
  city: string

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  state: string

  @IsString()
  @IsNotEmpty()
  zipCode: string
}

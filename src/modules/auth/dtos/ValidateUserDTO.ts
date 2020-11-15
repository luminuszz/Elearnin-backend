import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class ValidateUserDTo {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Field()
  email: string

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string
}

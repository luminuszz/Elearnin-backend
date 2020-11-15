import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string
}

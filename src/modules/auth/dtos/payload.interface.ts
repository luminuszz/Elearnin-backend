import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PayloadDTO {
  @Field()
  name: string

  @Field(() => ID)
  id: string

  @Field()
  email: string
}

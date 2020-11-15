import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
class User {
  @Field()
  name: string

  @Field()
  email: string

  @Field(() => ID)
  id: string
}

@ObjectType()
export class LoginReturn {
  @Field()
  token: string

  @Field(() => User)
  user: User
}

import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

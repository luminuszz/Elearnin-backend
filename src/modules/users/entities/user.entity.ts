import { Exclude } from 'class-transformer'
import { Course } from 'src/modules/courses/entities/course.entity'
import { hash } from 'bcrypt'
import { BeforeInsert, Column, Entity, ManyToMany } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'
import TransformerEncrypt from 'src/database/utils/TransformHashInstace'

export enum UserRole {
  admin = 'adminUser',
  user = 'commonUser',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ transformer: TransformerEncrypt })
  name: string

  @Column({ transformer: TransformerEncrypt })
  email: string

  @Column({ name: 'password_hash' })
  @Exclude()
  passwordHash: string

  @Column({ transformer: TransformerEncrypt })
  city: string

  @Column({ transformer: TransformerEncrypt })
  state: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole

  @Column({ name: 'zip_code', transformer: TransformerEncrypt })
  zipCode: string

  @ManyToMany(type => Course, course => course.users)
  courses: Course[]

  @BeforeInsert()
  private async createPasswordHash() {
    const hashSAlt = await hash(this.passwordHash, 10)
    this.passwordHash = hashSAlt
  }
}

import { Exclude } from 'class-transformer'
import { Course } from 'src/modules/courses/entities/course.entity'
import { BeforeInsert, Column, Entity, ManyToMany } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'
import encrypted from 'src/database/utils/TransformHashInstace'
import { Inject } from '@nestjs/common'
import {
  HashService,
  HashToken,
} from '../../../shared/providers/hash/hash.service'

export enum UserRole {
  admin = 'adminUser',
  user = 'commonUser',
}

@Entity('users')
export class User extends BaseEntity {
  @Inject(HashToken.hashService)
  private readonly hashService: HashService

  @Column({ transformer: encrypted })
  name: string

  @Column({ transformer: encrypted })
  email: string

  @Column({ name: 'password_hash' })
  @Exclude()
  passwordHash: string

  @Column({ transformer: encrypted })
  city: string

  @Column({ transformer: encrypted })
  state: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole

  @Column({ name: 'zip_code', transformer: encrypted })
  zipCode: string

  @ManyToMany(() => Course, course => course.users)
  courses: Course[]

  @BeforeInsert()
  private async createPasswordHash() {
    const hashSAlt = await this.hashService.createHash(this.passwordHash)
    this.passwordHash = hashSAlt
  }
}

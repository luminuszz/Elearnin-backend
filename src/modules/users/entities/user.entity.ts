import { Exclude } from 'class-transformer'
import { Course } from 'src/modules/courses/entities/course.entity'
import { hash } from 'bcrypt'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import TransformerEncrypt from 'src/database/utils/TransformHashInstace'

export enum UserRole {
  admin = 'adminUser',
  user = 'commonUser',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ transformer: TransformerEncrypt })
  name: string

  @Column({ transformer: TransformerEncrypt })
  email: string

  @Column({ name: 'password_hash' })
  // @Exclude()
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToMany(type => Course)
  @JoinTable()
  courses: Course[]

  @BeforeInsert()
  private async createPasswordHash() {
    const hashSAlt = await hash(this.passwordHash, 10)
    this.passwordHash = hashSAlt
  }
}

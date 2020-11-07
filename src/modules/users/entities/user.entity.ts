import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column({ name: 'password_hash' })
  passwordHash: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  role: 'admin' | 'user' | string

  @Column({ name: 'zip_code' })
  zipCode: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

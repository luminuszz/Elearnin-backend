import { Exclude, Expose } from 'class-transformer'
import { Lesson } from 'src/modules/lessons/entities/lesson.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { join } from 'path'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm'

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  description: string

  @Column({ nullable: true })
  image?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Lesson, lesson => lesson.course)
  lessons: Lesson[]

  @ManyToMany(type => User, user => user.courses, { cascade: true })
  @JoinTable()
  users: User[]

  @Expose({ name: 'imagesPath' })
  get imagePath(): string {
    const pathImage = join(process.env.STATIC_URL, 'images', this.image)
    return pathImage
  }
}

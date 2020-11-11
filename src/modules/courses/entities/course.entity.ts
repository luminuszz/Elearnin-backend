import { Expose } from 'class-transformer'
import { Lesson } from 'src/modules/lessons/entities/lesson.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { join } from 'path'
import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'
import { CourseCategory } from './courseCategory.entity'

@Entity('courses')
export class Course extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  description: string

  @Column({ nullable: true })
  image?: string

  @OneToMany(() => Lesson, lesson => lesson.course)
  lessons: Lesson[]

  @ManyToMany(() => User, user => user.courses)
  @JoinTable()
  users: User[]

  @ManyToOne(() => CourseCategory, courseCategory => courseCategory.courses)
  @JoinColumn()
  courseCategory: CourseCategory

  @Expose({ name: 'imagesPath' })
  get imagePath(): string {
    if (this.image) {
      const pathImage = join(process.env.STATIC_URL, 'images', this.image)
      return pathImage
    }
  }
}

import { Expose } from 'class-transformer'
import { Lesson } from 'src/modules/lessons/entities/lesson.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { join } from 'path'
import { Entity, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'

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

  @ManyToMany(type => User, user => user.courses, { cascade: true })
  @JoinTable()
  users: User[]

  @Expose({ name: 'imagesPath' })
  get imagePath(): string {
    const pathImage = join(process.env.STATIC_URL, 'images', this.image)
    return pathImage
  }
}

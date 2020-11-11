import { Course } from 'src/modules/courses/entities/course.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'

@Entity('course_category')
export class CourseCategory extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string

  @OneToMany(() => Course, course => course.courseCategory, { cascade: true })
  courses: Course[]
}

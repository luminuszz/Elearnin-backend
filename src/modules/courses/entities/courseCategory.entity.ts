import { Course } from 'src/modules/courses/entities/course.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'

@Entity('course_category')
export class CourseCategory extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string

  @ManyToOne(() => Course, course => course.courseCategory)
  courses: Course[]
}

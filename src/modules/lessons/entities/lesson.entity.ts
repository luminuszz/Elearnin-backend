import { Course } from 'src/modules/courses/entities/course.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from '../../../shared/entities/base.entity'

@Entity('lessons')
export class Lesson extends BaseEntity {
  @Column()
  name: string

  @Column()
  duration: number

  @Column()
  description: string

  @Column({ name: 'video_id' })
  videoId: string

  @Column({ name: 'course_id' })
  courseId: string

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course
}

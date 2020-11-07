import { Course } from 'src/modules/courses/entities/course.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm'

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course
}

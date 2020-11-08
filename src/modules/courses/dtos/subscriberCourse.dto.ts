import { IsUUID } from 'class-validator'

export class SubscriberCourseDTO {
  @IsUUID()
  courseId: string

  @IsUUID()
  userId: string
}

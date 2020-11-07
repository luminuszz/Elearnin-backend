import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class UpdateCourseDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsUUID()
  courseId: string
}
